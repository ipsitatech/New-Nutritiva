const { dbAll, dbGet, dbRun } = require('../config/db');

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const list = await dbAll('SELECT product_id FROM wishlist WHERE buyer_id = ?', [userId]);
    res.json(list.map(item => item.product_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  const { product_id } = req.body;
  try {
    const userId = req.userId;
    const existing = await dbGet('SELECT * FROM wishlist WHERE buyer_id = ? AND product_id = ?', [userId, product_id]);
    if (existing) {
      await dbRun('DELETE FROM wishlist WHERE id = ?', [existing.id]);
    } else {
      const wlId = `wl_${Date.now()}`;
      await dbRun('INSERT INTO wishlist (id, buyer_id, product_id, created_at) VALUES (?, ?, ?, ?)', [
        wlId, userId, product_id, new Date().toISOString()
      ]);
    }
    const list = await dbAll('SELECT product_id FROM wishlist WHERE buyer_id = ?', [userId]);
    res.json(list.map(item => item.product_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
