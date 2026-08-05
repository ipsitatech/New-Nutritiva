const { dbAll, dbRun } = require('../config/db');

exports.getNotifications = async (req, res) => {
  try {
    const list = await dbAll('SELECT * FROM notifications ORDER BY created_at DESC');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markNotificationRead = async (req, res) => {
  const { notification_id } = req.body;
  try {
    await dbRun('UPDATE notifications SET is_read = 1 WHERE id = ?', [notification_id]);
    const list = await dbAll('SELECT * FROM notifications ORDER BY created_at DESC');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
