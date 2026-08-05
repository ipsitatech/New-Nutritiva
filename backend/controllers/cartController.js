const { dbAll, dbGet, dbRun } = require('../config/db');

exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await dbAll(`
      SELECT 
        c.*, 
        p.name, 
        p.base_retail_price AS price, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = ?
    `, [userId]);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { product_id } = req.body;
  try {
    const userId = req.userId;
    const existing = await dbGet('SELECT * FROM cart WHERE buyer_id = ? AND product_id = ?', [userId, product_id]);
    if (existing) {
      const newQty = existing.quantity + 1;
      await dbRun('UPDATE cart SET quantity = ?, updated_at = ? WHERE id = ?', [newQty, new Date().toISOString(), existing.id]);
    } else {
      const cartId = `c_${Date.now()}`;
      await dbRun(`
        INSERT INTO cart (id, buyer_id, product_id, quantity, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [cartId, userId, product_id, 1, new Date().toISOString(), new Date().toISOString()]);
    }
    const cartItems = await dbAll(`
      SELECT 
        c.*, 
        p.name, 
        p.base_retail_price AS price, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = ?
    `, [userId]);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const userId = req.userId;
    if (quantity <= 0) {
      await dbRun('DELETE FROM cart WHERE buyer_id = ? AND product_id = ?', [userId, product_id]);
    } else {
      await dbRun(`
        UPDATE cart 
        SET quantity = ?, updated_at = ? 
        WHERE buyer_id = ? AND product_id = ?
      `, [quantity, new Date().toISOString(), userId, product_id]);
    }
    const cartItems = await dbAll(`
      SELECT 
        c.*, 
        p.name, 
        p.base_retail_price AS price, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = ?
    `, [userId]);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { product_id } = req.query;
  try {
    const userId = req.userId;
    await dbRun('DELETE FROM cart WHERE buyer_id = ? AND product_id = ?', [userId, product_id]);
    const cartItems = await dbAll(`
      SELECT 
        c.*, 
        p.name, 
        p.base_retail_price AS price, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = ?
    `, [userId]);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
