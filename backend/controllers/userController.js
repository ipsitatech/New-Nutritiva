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
    await dbRun(`
      UPDATE users 
      SET name = ?, email = ?, phone = ?, dob = ?, gender = ?, city = ?, status = ?, reward_points = ?, monthly_savings = ?, total_orders = ?, avatar = ?
      WHERE id = ?
    `, [name, email, phone, dob, gender, city, status, reward_points, monthly_savings, total_orders, avatar, userId]);
    
    const updatedUser = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
