const express = require("express");
const router = express.Router();
const db = require("../config/db");

console.log("✅ Product Routes Loaded");

// ===============================
// GET ALL PRODUCTS
// GET /api/products
// ===============================
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ===============================
// GET SINGLE PRODUCT
// GET /api/products/:id
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ===============================
// ADD PRODUCT
// POST /api/products
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      seller_id,
      product_name,
      category,
      price,
      stock,
      description,
      image,
    } = req.body;

    if (!seller_id || !product_name || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (seller_id, product_name, price, stock)",
      });
    }

    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    if (isNaN(stock) || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid non-negative number",
      });
    }

    const sql = `
      INSERT INTO products
      (seller_id, product_name, category, price, stock, description, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      seller_id,
      product_name,
      category || null,
      price,
      stock,
      description || null,
      image || null,
    ]);

    const [newProduct] = await db.query("SELECT * FROM products WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct[0],
    });
  } catch (err) {
    console.error(err);

    if (err.code === "ER_NO_REFERENCED_ROW_2" || err.code === "ER_NO_REFERENCED_ROW") {
      return res.status(400).json({
        success: false,
        message: "Invalid seller_id: seller does not exist",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ===============================
// UPDATE PRODUCT
// PUT /api/products/:id
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const {
      seller_id,
      product_name,
      category,
      price,
      stock,
      description,
      image,
    } = req.body;

    if (!seller_id || !product_name || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (seller_id, product_name, price, stock)",
      });
    }

    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    if (isNaN(stock) || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid non-negative number",
      });
    }

    const [existing] = await db.query("SELECT id FROM products WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const sql = `
      UPDATE products
      SET seller_id = ?,
          product_name = ?,
          category = ?,
          price = ?,
          stock = ?,
          description = ?,
          image = ?
      WHERE id = ?
    `;

    await db.query(sql, [
      seller_id,
      product_name,
      category || null,
      price,
      stock,
      description || null,
      image || null,
      id,
    ]);

    const [updatedProduct] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct[0],
    });
  } catch (err) {
    console.error(err);

    if (err.code === "ER_NO_REFERENCED_ROW_2" || err.code === "ER_NO_REFERENCED_ROW") {
      return res.status(400).json({
        success: false,
        message: "Invalid seller_id: seller does not exist",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ===============================
// DELETE PRODUCT
// DELETE /api/products/:id
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const [existing] = await db.query("SELECT id FROM products WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;