const { dbAll, dbRun } = require('../config/db');

exports.getReviews = async (req, res) => {
  try {
    const list = await dbAll('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReview = async (req, res) => {
  const { product_id, rating, review } = req.body;
  try {
    const userId = req.userId;
    const revId = `rev_${Date.now()}`;
    await dbRun(`
      INSERT INTO reviews (id, buyer_id, product_id, rating, review, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [revId, userId, product_id, rating, review, new Date().toISOString(), new Date().toISOString()]);
    const list = await dbAll('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
