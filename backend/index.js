const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const healthPreferenceRoutes = require('./routes/healthPreferenceRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/health-preferences', healthPreferenceRoutes);
app.use('/api/delivery', deliveryRoutes);

// Initialize MySQL database schemas/seeds, then launch server listener
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Nutritva Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database, server exiting...', err);
    process.exit(1);
  });
