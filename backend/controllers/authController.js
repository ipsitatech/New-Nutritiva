const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ========================= SIGNUP =========================
exports.signup = async (req, res) => {
  const { role, email, phone, password, ...profileData } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Check if email or phone already exists
    const [existing] = await connection.execute(
      "SELECT email, phone FROM users WHERE email = ? OR phone = ?",
      [email, phone],
    );

    if (existing.length > 0) {
      const match = existing[0];
      if (match.email === email) {
        return res.status(400).json({ message: "Email already in use." });
      }
      if (match.phone === phone) {
        return res
          .status(400)
          .json({ message: "Phone number already in use." });
      }
    }

    // Hash Password (Guests don't have passwords)
    let passwordHash = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    // Insert into users table (Sellers default to pending)
    const [userResult] = await connection.execute(
      "INSERT INTO users (email, phone, password_hash, role, status) VALUES (?, ?, ?, ?, ?)",
      [
        email,
        phone,
        passwordHash,
        role,
        role === "seller" ? "pending" : "active",
      ],
    );

    const userId = userResult.insertId;

    // Buyer Profile
    if (role === "buyer") {
      await connection.execute(
        "INSERT INTO buyer_profiles (user_id, full_name, address, promo_emails) VALUES (?, ?, ?, ?)",
        [
          userId,
          profileData.fullName,
          profileData.address,
          profileData.promoEmails || false,
        ],
      );
    }

    // Seller Profile
    else if (role === "seller") {
      await connection.execute(
        "INSERT INTO seller_profiles (user_id, first_name, last_name, business_name, business_type, primary_category, gst_number, business_address, bank_account, ifsc_code, tan_card_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          profileData.firstName,
          profileData.lastName,
          profileData.businessName,
          profileData.businessType,
          profileData.primaryCategory,
          profileData.gstNumber,
          profileData.address,
          profileData.bankAccount,
          profileData.ifscCode,
          req.file ? req.file.path : null,
        ],
      );
    }

    // Generate JWT token for buyer or guest since their accounts are active immediately
    let token = null;
    if (role === "buyer" || role === "guest") {
      token = jwt.sign(
        { id: userId, role: role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
    }

    await connection.commit();
    res.status(201).json({ 
      message: "User registered successfully",
      token,
      role
    });
  } catch (error) {
    await connection.rollback();
    console.error("Signup Error Details:", error);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  } finally {
    connection.release();
  }
};

// ========================= SIGNIN =========================
exports.signin = async (req, res) => {
  const { email, password } = req.body; // Expects email OR phone string from front-end

  try {
    // Fix #3: Look up user by Email OR Phone number
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, email],
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // Fix #2: Gatekeep Pending/Suspended Accounts
    if (user.status === "pending") {
      return res.status(403).json({
        status: user.status,
        message:
          "Your seller account application is currently pending verification review by our team.",
      });
    }
    if (user.status === "suspended") {
      return res
        .status(403)
        .json({
          message: "This account has been suspended due to compliance issues.",
        });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    console.error("Signin Error Details:", error);
    res
      .status(500)
      .json({ message: "Sign-in failed. Please try again later." });
  }
};

// ========================= FORGOT PASSWORD =========================
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const user = users[0];

    // Fix #1: Use absolute time tracking field for tracking cooldowns
    if (user.otp_resend_count >= 3) {
      if (user.otp_cooldown_started_at) {
        const cooldownStart = new Date(user.otp_cooldown_started_at);
        const now = new Date();
        const minutesElapsed = (now - cooldownStart) / (1000 * 60);

        if (minutesElapsed < 60) {
          return res.status(429).json({
            message: `Too many OTP requests. Please wait another ${Math.ceil(60 - minutesElapsed)} minutes.`,
          });
        } else {
          // Reset interval count window cleanly
          await pool.execute(
            "UPDATE users SET otp_resend_count = 0, otp_cooldown_started_at = NULL WHERE email = ?",
            [email],
          );
        }
      }
    }

    // Generate NEW 6-digit cryptographic OTP value
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 3 * 60 * 1000); // 3 Minute runtime

    // Log the event timestamp only on the first breach attempt
    let cooldownUpdateSql = "";
    if (user.otp_resend_count === 2) {
      cooldownUpdateSql = ", otp_cooldown_started_at = NOW()";
    }

    await pool.execute(
      `UPDATE users SET otp = ?, otp_expiry = ?, otp_resend_count = otp_resend_count + 1 ${cooldownUpdateSql} WHERE email = ?`,
      [otp, expiry, email],
    );

    // Nodemailer Delivery Node
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Nutritiva Password Reset OTP",
      text: `Your new OTP is: ${otp}. It will expire in 3 minutes.`,
    });

    res.json({ message: "A new OTP has been sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error Details:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP. Please try again later." });
  }
};

// ========================= VERIFY OTP =========================
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? AND otp = ?",
      [email, otp],
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = users[0];

    if (new Date(user.otp_expiry) < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error Details:", error);
    res
      .status(500)
      .json({ message: "Verification failed. Please try again later." });
  }
};

// ========================= RESET PASSWORD =========================
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Flush credentials safely post-consumption
    await pool.execute(
      "UPDATE users SET password_hash = ?, otp = NULL, otp_expiry = NULL, otp_resend_count = 0, otp_cooldown_started_at = NULL WHERE email = ?",
      [hashedPassword, email],
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error Details:", error);
    res
      .status(500)
      .json({ message: "Password reset failed. Please try again later." });
  }
};
