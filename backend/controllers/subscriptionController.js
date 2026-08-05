const { dbAll } = require('../config/db');

exports.getSubscriptions = async (req, res) => {
  try {
    const userId = req.userId;
    const list = await dbAll('SELECT * FROM subscriptions WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
