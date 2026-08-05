const { dbAll } = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const products = await dbAll(`
      SELECT 
        p.product_id AS id, 
        p.sku, 
        p.name, 
        p.description, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight, 
        CAST(p.base_retail_price AS SIGNED) AS price, 
        CAST(p.base_retail_price * 1.3 AS SIGNED) AS originalPrice,
        '20% OFF' AS discount,
        4.6 AS rating,
        '1.2k' AS reviews,
        c.name AS category, 
        p.image_url AS image, 
        p.stock_qty AS stock_quantity, 
        p.is_active AS status, 
        p.owner_id AS seller_id
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE p.is_active = 1
    `);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
