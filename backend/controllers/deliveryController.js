const { dbGet, dbRun, dbAll } = require('../config/db');

// Calculate shipping rates based on pincode and total spent
exports.calculateRates = async (req, res) => {
  const { pincode, total } = req.query;
  try {
    const orderTotal = parseInt(total) || 0;
    const isDelhiNCR = pincode && (pincode.startsWith('11') || pincode.startsWith('20'));
    
    let postage = 50;
    let eta = '3-5 Days';
    let carrier = 'Delhivery';
    
    if (isDelhiNCR) {
      postage = 30;
      eta = '15 Minutes (Express Delivery)';
      carrier = 'Dunzo';
    }
    
    if (orderTotal >= 499) {
      postage = 0; // Free delivery above 499
    }
    
    res.json({
      success: true,
      pincode,
      carrier,
      postage,
      eta,
      freeDeliveryLimitReached: orderTotal >= 499
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Internal helper to create shipment
exports.createShipmentInternal = async (orderId, totalAmount, address) => {
  const trackingId = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
  const isDelhiNCR = address && (address.toLowerCase().includes('noida') || address.toLowerCase().includes('delhi'));
  
  const carrier = isDelhiNCR ? 'Dunzo' : 'Delhivery';
  const estimatedDelivery = isDelhiNCR ? '15 Minutes' : '3 Days';
  
  await dbRun(`
    INSERT INTO shipments (order_id, tracking_id, carrier, status, estimated_delivery, created_at, updated_at)
    VALUES (?, ?, ?, 'PLACED', ?, NOW(), NOW())
  `, [orderId, trackingId, carrier, estimatedDelivery]);
  
  return { trackingId, carrier };
};

// Track delivery status with time-based progression
exports.trackShipment = async (req, res) => {
  const { trackingId } = req.params;
  try {
    const shipment = await dbGet('SELECT * FROM shipments WHERE tracking_id = ?', [trackingId]);
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    
    // Calculate seconds elapsed since creation to simulate real-time updates
    const elapsedSeconds = Math.floor((Date.now() - new Date(shipment.created_at).getTime()) / 1000);
    
    let status = 'PLACED';
    let riderProgress = 0;
    let detail = 'Package received by carrier. Sorting facility Noida.';
    let rider = null;
    
    if (elapsedSeconds >= 90) {
      status = 'DELIVERED';
      riderProgress = 100;
      detail = 'Order delivered successfully at your doorstep.';
      rider = { name: 'Ramesh Kumar', phone: '+91 98765 43210', temp: '98.2°F', status: 'Vaccinated' };
    } else if (elapsedSeconds >= 75) {
      status = 'ARRIVED';
      riderProgress = 95;
      detail = 'Rider Ramesh Kumar has arrived at your doorstep.';
      rider = { name: 'Ramesh Kumar', phone: '+91 98765 43210', temp: '98.2°F', status: 'Vaccinated' };
    } else if (elapsedSeconds >= 30) {
      status = 'ON_THE_WAY';
      // Calculate rider progress between 10% and 90% based on time
      const timePercent = (elapsedSeconds - 30) / 45; // 45 seconds duration
      riderProgress = Math.min(90, Math.floor(10 + timePercent * 80));
      detail = 'Rider Ramesh Kumar is out for delivery with your package.';
      rider = { name: 'Ramesh Kumar', phone: '+91 98765 43210', temp: '98.4°F', status: 'Vaccinated' };
    } else if (elapsedSeconds >= 15) {
      status = 'PACKING';
      riderProgress = 0;
      detail = 'Your package is packed and ready at the store facility.';
    }
    
    // If status has changed, synchronize the DB records
    if (shipment.status !== status) {
      await dbRun('UPDATE shipments SET status = ? WHERE tracking_id = ?', [status, trackingId]);
      await dbRun('UPDATE orders SET order_status = ? WHERE id = ?', [status, shipment.order_id]);
      
      // Seed status update notifications if not already seeded
      const notifId = `not_delivery_${status}_${trackingId}`;
      const notifExists = await dbGet('SELECT id FROM notifications WHERE id = ?', [notifId]);
      
      if (!notifExists) {
        // Find buyer_id for notification
        const order = await dbGet('SELECT buyer_id, order_number FROM orders WHERE id = ?', [shipment.order_id]);
        if (order) {
          await dbRun(`
            INSERT INTO notifications (id, buyer_id, title, message, is_read, created_at)
            VALUES (?, ?, ?, ?, 0, NOW())
          `, [
            notifId, 
            order.buyer_id, 
            `Order Status Update: ${status}`, 
            `Your order ${order.order_number} is now ${status.toLowerCase().replace('_', ' ')}.`,
            new Date().toISOString()
          ]);
        }
      }
    }
    
    res.json({
      success: true,
      trackingId,
      carrier: shipment.carrier,
      status,
      riderProgress,
      detail,
      rider,
      estimatedDelivery: shipment.estimated_delivery,
      elapsedSeconds
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
