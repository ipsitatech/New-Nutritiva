const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

// Import Routes
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // NEW

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve product images
app.use("/uploads", express.static("uploads"));

// Root Route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// API Routes
app.use("/api/seller", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // NEW

// Test Database API
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");

    res.json({
      message: "DB Working Fine",
      result: rows[0].result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Test MySQL connection when server starts
db.query("SELECT 1")
  .then(() => {
    console.log("✅ MySQL Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MySQL Connection Failed");
    console.error(err.message);
  });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});