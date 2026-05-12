const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { role, email, phone, password, ...profileData } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Hash Password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 2. Insert into 'users' table
        const [userResult] = await connection.execute(
            'INSERT INTO users (email, phone, password_hash, role, status) VALUES (?, ?, ?, ?, ?)',
            [email, phone, passwordHash, role, role === 'seller' ? 'pending' : 'active']
        );

        const userId = userResult.insertId;

        // 3. Role-specific Transactional Logic
        if (role === 'buyer') {
            await connection.execute(
                'INSERT INTO buyer_profiles (user_id, full_name, address, promo_emails) VALUES (?, ?, ?, ?)',
                [userId, profileData.fullName, profileData.address, profileData.promoEmails || false]
            );
        } else if (role === 'seller') {
            await connection.execute(
                'INSERT INTO seller_profiles (user_id, first_name, last_name, business_name, business_type, primary_category, gst_number, business_address, bank_account, ifsc_code, tan_card_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    userId, profileData.firstName, profileData.lastName, profileData.businessName,
                    profileData.businessType, profileData.primaryCategory, profileData.gstNumber,
                    profileData.address, profileData.bankAccount, profileData.ifscCode, req.file ? req.file.path : null
                ]
            );
        }

        await connection.commit();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

exports.signin = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        // Search by email OR phone (Fast retrieval via index)
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ? OR phone = ?',
            [emailOrPhone, emailOrPhone]
        );

        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, role: user.role, status: user.status });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
