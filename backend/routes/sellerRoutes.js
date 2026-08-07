const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// SELLER REGISTER
// ==========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existing] = await db.query(
      "SELECT * FROM sellers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Seller already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO sellers (name, email, password, phone) VALUES (?, ?, ?, ?)";

    const [result] = await db.query(sql, [
      name,
      email,
      hashedPassword,
      phone,
    ]);

    res.status(201).json({
      message: "Seller registered successfully",
      sellerId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// SELLER LOGIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const [users] = await db.query(
      "SELECT * FROM sellers WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const seller = users[0];

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: seller.id, email: seller.email },
      "secretKey123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      seller: {
        id: seller.id,
        name: seller.name,
        email: seller.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;