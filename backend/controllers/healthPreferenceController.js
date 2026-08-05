const { dbAll, dbGet, dbRun } = require('../config/db');

exports.getHealthPreferences = async (req, res) => {
  try {
    const userId = req.userId;
    const list = await dbAll('SELECT * FROM health_preferences WHERE buyer_id = ?', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleHealthPreference = async (req, res) => {
  const { preference } = req.body;
  try {
    const userId = req.userId;
    const existing = await dbGet('SELECT * FROM health_preferences WHERE buyer_id = ? AND preference = ?', [userId, preference]);
    if (existing) {
      await dbRun('DELETE FROM health_preferences WHERE id = ?', [existing.id]);
    } else {
      const hpId = `hp_${Date.now()}`;
      await dbRun('INSERT INTO health_preferences (id, buyer_id, preference, created_at) VALUES (?, ?, ?, ?)', [
        hpId, userId, preference, new Date().toISOString()
      ]);
    }
    const list = await dbAll('SELECT * FROM health_preferences WHERE buyer_id = ?', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
