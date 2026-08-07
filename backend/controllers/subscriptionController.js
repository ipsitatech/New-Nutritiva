const { dbAll, dbRun, dbGet } = require('../config/db');

exports.getSubscriptions = async (req, res) => {
  try {
    const userId = req.userId;
    const list = await dbAll('SELECT * FROM subscriptions WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    const validStatuses = ['ACTIVE', 'PAUSED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    // Verify ownership
    const sub = await dbGet('SELECT * FROM subscriptions WHERE id = ? AND buyer_id = ?', [id, userId]);
    if (!sub) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    await dbRun('UPDATE subscriptions SET status = ? WHERE id = ?', [status.toUpperCase(), id]);
    
    // Return updated list
    const list = await dbAll('SELECT * FROM subscriptions WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
