const { dbGet, dbRun } = require('../config/db');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, email, phone, dob, gender, city, status, reward_points, monthly_savings, total_orders, avatar } = req.body;
  try {
    const userId = req.userId;
    
    // Check if phone number is already registered by another user
    if (phone) {
      const existing = await dbGet('SELECT id FROM users WHERE phone = ? AND id != ?', [phone, userId]);
      if (existing) {
        return res.status(400).json({ error: 'Phone number is already registered by another user.' });
      }
    }

    // Check if email address is already registered by another user
    if (email) {
      const emailVal = email.trim();
      const existingEmail = await dbGet('SELECT id FROM users WHERE email = ? AND id != ?', [emailVal, userId]);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email Address is already registered by another user.' });
      }
    }

    const oldUser = await dbGet('SELECT status FROM users WHERE id = ?', [userId]);
    const oldStatus = oldUser ? oldUser.status : 'Regular Member';

    await dbRun(`
      UPDATE users 
      SET name = ?, email = ?, phone = ?, dob = ?, gender = ?, city = ?, status = ?, reward_points = ?, monthly_savings = ?, total_orders = ?, avatar = ?
      WHERE id = ?
    `, [name, email, phone, dob, gender, city, status, reward_points, monthly_savings, total_orders, avatar, userId]);

    if (status && status !== oldStatus && status.startsWith('VIP')) {
      const notifId = 'notif_vip_' + Date.now();
      const planName = status.replace('VIP ', '').replace(' Member', '');
      await dbRun(`
        INSERT INTO notifications (id, buyer_id, type, title, message, is_read, created_at)
        VALUES (?, ?, 'GENERAL', ?, ?, 0, NOW())
      `, [
        notifId,
        userId,
        `👑 VIP ${planName} Activated!`,
        `Congratulations! Your Nutritiva VIP ${planName} membership has been successfully activated. Enjoy exclusive member deals, free delivery, and priority support!`
      ]);
    }
    
    const updatedUser = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
