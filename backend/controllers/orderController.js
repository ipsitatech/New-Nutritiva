const { dbAll, dbGet, dbRun } = require('../config/db');
const deliveryController = require('./deliveryController');
const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await dbAll('SELECT * FROM orders WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderItems = async (req, res) => {
  try {
    const items = await dbAll(`
      SELECT 
        oi.*, 
        p.name, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
    `);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.userId;
    const { paymentMethod, couponCode, addressId, shippingAddress } = req.body;

    // 1. Fetch current cart
    const cartItems = await dbAll(`
      SELECT c.*, p.base_retail_price AS price 
      FROM cart c 
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = ?
    `, [userId]);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Dynamic Server-Side Checkout Calculation
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Re-verify coupon discount
    let couponDiscount = 0;
    if (couponCode) {
      const codeClean = couponCode.trim().toUpperCase();
      if (codeClean === 'NUTRITVA40') {
        couponDiscount = Math.round(subtotal * 0.40);
      } else if (codeClean === 'WELCOME10') {
        couponDiscount = Math.round(subtotal * 0.10);
      } else if (codeClean === 'VIPGOLD') {
        couponDiscount = Math.round(subtotal * 0.15);
      }
    }

    const shippingFee = subtotal > 499 ? 0 : 40;
    const gstTax = Math.round(subtotal * 0.05);
    const totalSpent = subtotal - couponDiscount + shippingFee + gstTax;

    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ord_new_${orderNum}`;

    /* 
    ===========================================================================
    UNCOMMENT THIS BLOCK FOR LIVE RAZORPAY INTEGRATION (UAT/PRODUCTION)
    ===========================================================================
    // Initialize Razorpay SDK client
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_T7Py4RNHzV3hKl',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'AXWzdoOoRFxNhuZekHqtLWVi'
    });

    // Create official Razorpay order session
    const rzpOrder = await razorpayInstance.orders.create({
      amount: totalSpent * 100, // in Paisa
      currency: 'INR',
      receipt: orderId
    });

    // Insert into orders table as PENDING/UNPAID first
    await dbRun(`
      INSERT INTO orders (id, buyer_id, order_number, total_amount, payment_status, order_status, delivery_date, tracking_id, delivery_partner, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderId, 
      userId, 
      `NT${orderNum}`, 
      totalSpent, 
      'PENDING', 
      'PENDING', 
      new Date(Date.now() + 86400000).toISOString().split('T')[0],
      null,
      null,
      new Date().toISOString(), 
      new Date().toISOString()
    ]);

    // Insert into order items table
    for (let idx = 0; idx < cartItems.length; idx++) {
      const item = cartItems[idx];
      await dbRun(`
        INSERT INTO order_items (id, order_id, product_id, quantity, price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        `oi_new_${Date.now()}_${idx}`, 
        orderId, 
        item.product_id, 
        item.quantity, 
        item.price, 
        item.price * item.quantity
      ]);
    }

    return res.json({
      success: true,
      checkoutSession: true,
      orderId,
      rzpOrderId: rzpOrder.id,
      amount: totalSpent * 100,
      rzpKey: process.env.RAZORPAY_KEY_ID || 'rzp_test_T7Py4RNHzV3hKl'
    });
    ===========================================================================
    */

    // --- SIMULATED CHECKOUT FLOW FOR LOCALHOST / UAT ---
    const destAddress = shippingAddress || 'Noida, Uttar Pradesh';
    
    // Pre-calculate tracking details to insert parent order first
    const trackingId = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
    const isDelhiNCR = destAddress && (destAddress.toLowerCase().includes('noida') || destAddress.toLowerCase().includes('delhi'));
    const carrier = isDelhiNCR ? 'Dunzo' : 'Delhivery';
    const estimatedDelivery = isDelhiNCR ? '15 Minutes' : '3 Days';

    // 2. Insert into orders table as PAID / PLACED directly (Parent Row)
    await dbRun(`
      INSERT INTO orders (id, buyer_id, order_number, total_amount, payment_status, order_status, delivery_date, tracking_id, delivery_partner, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderId, 
      userId, 
      `NT${orderNum}`, 
      totalSpent, 
      'PAID', 
      'PLACED', 
      new Date(Date.now() + 86400000).toISOString().split('T')[0],
      trackingId,
      carrier,
      new Date().toISOString(), 
      new Date().toISOString()
    ]);

    // 2.5 Insert into shipments table directly (Child Row)
    await dbRun(`
      INSERT INTO shipments (order_id, tracking_id, carrier, status, estimated_delivery, created_at, updated_at)
      VALUES (?, ?, ?, 'PLACED', ?, NOW(), NOW())
    `, [orderId, trackingId, carrier, estimatedDelivery]);

    // 3. Insert into order items table
    for (let idx = 0; idx < cartItems.length; idx++) {
      const item = cartItems[idx];
      await dbRun(`
        INSERT INTO order_items (id, order_id, product_id, quantity, price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        `oi_new_${Date.now()}_${idx}`, 
        orderId, 
        item.product_id, 
        item.quantity, 
        item.price, 
        item.price * item.quantity
      ]);
    }

    // 4. Insert into payments table
    const payId = `pay_new_${Date.now()}`;
    await dbRun(`
      INSERT INTO payments (id, order_id, payment_method, transaction_id, amount, payment_status, paid_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      payId, 
      orderId, 
      paymentMethod || 'Simulated Card/UPI', 
      `TXN_SIM_${Math.floor(1000000000 + Math.random() * 9000000000)}`, 
      totalSpent, 
      'SUCCESS', 
      new Date().toISOString(), 
      new Date().toISOString()
    ]);

    // 5. Update user statistics in users table
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    const newOrdersCount = user.total_orders + 1;
    const newSavings = user.monthly_savings + couponDiscount + Math.round(subtotal * 0.1);
    const newRewards = user.reward_points + Math.round(totalSpent * 0.1);

    await dbRun(`
      UPDATE users 
      SET total_orders = ?, monthly_savings = ?, reward_points = ?
      WHERE id = ?
    `, [newOrdersCount, newSavings, newRewards, userId]);

    // 6. Push order notification
    const notifId = `notif_order_${Date.now()}`;
    await dbRun(`
      INSERT INTO notifications (id, buyer_id, type, title, message, is_read, created_at)
      VALUES (?, ?, ?, ?, ?, 0, ?)
    `, [
      notifId,
      userId,
      'ORDER',
      '🎉 Order Placed Successfully!',
      `Your order NT${orderNum} has been received. Delivering to ${destAddress} via ${carrier}.`,
      new Date().toISOString()
    ]);

    // 7. Clear cart
    await dbRun('DELETE FROM cart WHERE buyer_id = ?', [userId]);

    // Fetch the fresh states to return to front-end for immediate synchronization
    const freshUser = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    const freshOrders = await dbAll('SELECT * FROM orders WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    const freshOrderItems = await dbAll(`
      SELECT 
        oi.*, 
        p.name, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
    `);
    const freshPayments = await dbAll('SELECT * FROM payments ORDER BY created_at DESC');

    res.json({
      success: true,
      simulatedCheckout: true,
      orderId,
      trackingId,
      user: freshUser,
      orders: freshOrders,
      orderItems: freshOrderItems,
      payments: freshPayments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  /*
  ===========================================================================
  UNCOMMENT THIS BLOCK FOR LIVE RAZORPAY SIGNATURE VERIFICATION
  ===========================================================================
  try {
    const userId = req.userId;
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderId,
      paymentMethod,
      shippingAddress,
      couponCode
    } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'AXWzdoOoRFxNhuZekHqtLWVi');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Payment signature verification failed' });
    }

    const order = await dbGet('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const destAddress = shippingAddress || 'Noida, Uttar Pradesh';
    const { trackingId, carrier } = await deliveryController.createShipmentInternal(orderId, order.total_amount, destAddress);

    await dbRun(`
      UPDATE orders
      SET payment_status = 'PAID', order_status = 'PLACED', tracking_id = ?, delivery_partner = ?, updated_at = ?
      WHERE id = ?
    `, [trackingId, carrier, new Date().toISOString(), orderId]);

    const payId = `pay_new_${Date.now()}`;
    await dbRun(`
      INSERT INTO payments (id, order_id, payment_method, transaction_id, amount, payment_status, paid_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      payId, 
      orderId, 
      paymentMethod || 'Razorpay Card/UPI', 
      razorpay_payment_id, 
      order.total_amount, 
      'SUCCESS', 
      new Date().toISOString(), 
      new Date().toISOString()
    ]);

    const user = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    const newOrdersCount = user.total_orders + 1;
    
    let couponDiscount = 0;
    if (couponCode) {
      const items = await dbAll('SELECT price, quantity FROM order_items WHERE order_id = ?', [orderId]);
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      if (couponCode.toUpperCase() === 'NUTRITVA40') couponDiscount = Math.round(subtotal * 0.40);
      else if (couponCode.toUpperCase() === 'WELCOME10') couponDiscount = Math.round(subtotal * 0.10);
      else if (couponCode.toUpperCase() === 'VIPGOLD') couponDiscount = Math.round(subtotal * 0.15);
    }
    
    const newSavings = user.monthly_savings + couponDiscount + Math.round(order.total_amount * 0.1);
    const newRewards = user.reward_points + Math.round(order.total_amount * 0.1);

    await dbRun(`
      UPDATE users 
      SET total_orders = ?, monthly_savings = ?, reward_points = ?
      WHERE id = ?
    `, [newOrdersCount, newSavings, newRewards, userId]);

    const notifId = `notif_order_${Date.now()}`;
    await dbRun(`
      INSERT INTO notifications (id, buyer_id, type, title, message, is_read, created_at)
      VALUES (?, ?, ?, ?, ?, 0, ?)
    `, [
      notifId,
      userId,
      'ORDER',
      '🎉 Payment Verified & Order Placed!',
      `Your order ${order.order_number} is successful. Delivering via ${carrier} (AWB: ${trackingId}).`,
      new Date().toISOString()
    ]);

    await dbRun('DELETE FROM cart WHERE buyer_id = ?', [userId]);

    const freshUser = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    const freshOrders = await dbAll('SELECT * FROM orders WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    const freshOrderItems = await dbAll(`
      SELECT 
        oi.*, 
        p.name, 
        p.image_url AS image, 
        CASE 
          WHEN p.product_id = 18 THEN '60 caps' 
          WHEN p.product_id = 17 THEN '1L' 
          ELSE CONCAT(p.weight_gm, 'g') 
        END AS weight
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
    `);
    const freshPayments = await dbAll('SELECT * FROM payments ORDER BY created_at DESC');

    res.json({
      success: true,
      orderId,
      trackingId,
      user: freshUser,
      orders: freshOrders,
      orderItems: freshOrderItems,
      payments: freshPayments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  */
  res.json({ success: true, mock: true });
};

exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.body;
    
    // Check if order exists and belongs to user
    const order = await dbGet('SELECT * FROM orders WHERE id = ? AND buyer_id = ?', [orderId, userId]);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if status is cancelable
    const status = order.order_status.toUpperCase();
    if (['DELIVERED', 'CANCELLED', 'RETURNED'].includes(status)) {
      return res.status(400).json({ error: `Cannot cancel an order that is already ${status.toLowerCase()}` });
    }
    
    // Update order status
    await dbRun('UPDATE orders SET order_status = ? WHERE id = ?', ['CANCELLED', orderId]);
    
    // Delete shipment so it doesn't simulate tracking anymore
    await dbRun('DELETE FROM shipments WHERE order_id = ?', [orderId]);
    
    // Push cancellation notification
    const notifId = `notif_cancel_${Date.now()}`;
    await dbRun(`
      INSERT INTO notifications (id, buyer_id, type, title, message, is_read, created_at)
      VALUES (?, ?, ?, ?, ?, 0, ?)
    `, [
      notifId,
      userId,
      'ORDER',
      '🚫 Order Cancelled',
      `Your order #${order.order_number || 'N/A'} has been successfully cancelled.`,
      new Date().toISOString()
    ]);
    
    // Fetch fresh user data, orders, and notifications
    const freshUser = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    const freshOrders = await dbAll('SELECT * FROM orders WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    const freshNotifications = await dbAll('SELECT * FROM notifications WHERE buyer_id = ? ORDER BY created_at DESC', [userId]);
    
    res.json({
      success: true,
      message: 'Order cancelled successfully',
      user: freshUser,
      orders: freshOrders,
      notifications: freshNotifications
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
