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

    if (status.toUpperCase() === 'ACTIVE') {
      // Renew: update status and set end date 30 days from now (TC52)
      await dbRun("UPDATE subscriptions SET status = 'ACTIVE', end_date = DATE_ADD(NOW(), INTERVAL 30 DAY) WHERE id = ?", [id]);
    } else {
      await dbRun('UPDATE subscriptions SET status = ? WHERE id = ?', [status.toUpperCase(), id]);
    }
    
    // Return updated list
    const list = await dbAll('SELECT * FROM subscriptions WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changeSubscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan_name } = req.body;
    const userId = req.userId;

    if (!plan_name) {
      return res.status(400).json({ error: 'Plan name is required.' });
    }

    // Verify ownership
    const sub = await dbGet('SELECT * FROM subscriptions WHERE id = ? AND buyer_id = ?', [id, userId]);
    if (!sub) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    await dbRun('UPDATE subscriptions SET plan_name = ? WHERE id = ?', [plan_name, id]);
    
    // Return updated list
    const list = await dbAll('SELECT * FROM subscriptions WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubscriptionAutoRenew = async (req, res) => {
  try {
    const { id } = req.params;
    const { auto_renew } = req.body;
    const userId = req.userId;

    if (auto_renew === undefined) {
      return res.status(400).json({ error: 'auto_renew value is required.' });
    }

    // Verify ownership
    const sub = await dbGet('SELECT * FROM subscriptions WHERE id = ? AND buyer_id = ?', [id, userId]);
    if (!sub) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    const autoRenewVal = auto_renew ? 1 : 0;
    await dbRun('UPDATE subscriptions SET auto_renew = ? WHERE id = ?', [autoRenewVal, id]);
    
    // Return updated list
    const list = await dbAll('SELECT * FROM subscriptions WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
