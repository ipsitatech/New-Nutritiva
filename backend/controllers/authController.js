const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// ========================= SIGNUP =========================

exports.signup = async (req, res) => {
    const { role, email, phone, password, ...profileData } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Hash Password (Guests don't have passwords)
        let passwordHash = null;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
        }

        // Insert into users table
        const [userResult] = await connection.execute(
            'INSERT INTO users (email, phone, password_hash, role, status) VALUES (?, ?, ?, ?, ?)',
            [email, phone, passwordHash, role, role === 'seller' ? 'pending' : 'active']
        );

        const userId = userResult.insertId;

        // Buyer Profile
        if (role === 'buyer') {
            await connection.execute(
                'INSERT INTO buyer_profiles (user_id, full_name, address, promo_emails) VALUES (?, ?, ?, ?)',
                [userId, profileData.fullName, profileData.address, profileData.promoEmails || false]
            );
        }

        // Seller Profile
        else if (role === 'seller') {
            await connection.execute(
                'INSERT INTO seller_profiles (user_id, first_name, last_name, business_name, business_type, primary_category, gst_number, business_address, bank_account, ifsc_code, tan_card_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
                    req.file ? req.file.path : null
                ]
            );
        }

        await connection.commit();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        await connection.rollback();

        res.status(500).json({
            error: error.message
        });

    } finally {
        connection.release();
    }
};


// ========================= SIGNIN =========================

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Search by Email ONLY
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = users[0];

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        res.json({
            token,
            role: user.role,
            status: user.status
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


// ========================= FORGOT PASSWORD =========================

exports.forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {

        // Check user exists
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: 'Email not found'
            });
        }

        // Generate OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Expiry Time (5 minutes)
        const expiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // Save OTP in DB
        await pool.execute(
            'UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?',
            [otp, expiry, email]
        );

        // Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send OTP Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Nutritva Password Reset OTP',
            text: `Your OTP is: ${otp}`
        });

        res.json({
            message: 'OTP sent successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


// ========================= VERIFY OTP =========================

exports.verifyOtp = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND otp = ?',
            [email, otp]
        );

        if (users.length === 0) {
            return res.status(400).json({
                message: 'Invalid OTP'
            });
        }

        const user = users[0];

        // Check Expiry
        if (new Date(user.otp_expiry) < new Date()) {

            return res.status(400).json({
                message: 'OTP expired'
            });

        }

        res.json({
            message: 'OTP verified successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


// ========================= RESET PASSWORD =========================

exports.resetPassword = async (req, res) => {

    const { email, newPassword } = req.body;

    try {

        // Hash New Password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            newPassword,
            salt
        );

        // Update Password
        await pool.execute(
            'UPDATE users SET password_hash = ?, otp = NULL, otp_expiry = NULL WHERE email = ?',
            [hashedPassword, email]
        );

        res.json({
            message: 'Password reset successful'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};