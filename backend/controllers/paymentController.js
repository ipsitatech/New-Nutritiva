const { dbAll } = require('../config/db');

exports.getPayments = async (req, res) => {
  try {
    const list = await dbAll('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
