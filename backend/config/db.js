const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MySQL Connection Credentials Configuration
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'password';
const DB_NAME = process.env.DB_NAME || 'nutritiva';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const dbRun = async (query, params = []) => {
  const [result] = await pool.execute(query, params);
  return result;
};

const dbAll = async (query, params = []) => {
  const [rows] = await pool.execute(query, params);
  return rows;
};

const dbGet = async (query, params = []) => {
  const [rows] = await pool.execute(query, params);
  return rows.length > 0 ? rows[0] : null;
};

const initDB = async () => {
  try {
    // 1. Establish temporary connection without database name to ensure the database exists
    console.log(`Connecting to MySQL server at ${DB_HOST} to check database schema...`);
    const tempConn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD
    });

    // Create database if it does not exist
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await tempConn.end();
    console.log(`Verified/Created database: \`${DB_NAME}\``);

    // Schema check & drop old products table if columns are outdated
    try {
      const columns = await dbAll("SHOW COLUMNS FROM products");
      const hasProductId = columns.some(col => col.Field === 'product_id');
      if (!hasProductId) {
        await dbRun("SET FOREIGN_KEY_CHECKS = 0");
        await dbRun("DROP TABLE IF EXISTS cart");
        await dbRun("DROP TABLE IF EXISTS wishlist");
        await dbRun("DROP TABLE IF EXISTS order_items");
        await dbRun("DROP TABLE IF EXISTS reviews");
        await dbRun("DROP TABLE IF EXISTS products");
        await dbRun("DROP TABLE IF EXISTS categories");
        await dbRun("SET FOREIGN_KEY_CHECKS = 1");
        console.log("Old products and categories schemas dropped for product_id PK migration.");
      }
    } catch (e) {
      // Table doesn't exist yet, which is fine
    }

    // Schema check for orders table to ensure tracking_id and delivery_partner columns exist
    try {
      const columns = await dbAll("SHOW COLUMNS FROM orders");
      const hasTrackingId = columns.some(col => col.Field === 'tracking_id');
      if (!hasTrackingId) {
        await dbRun("ALTER TABLE orders ADD COLUMN tracking_id VARCHAR(100)");
        await dbRun("ALTER TABLE orders ADD COLUMN delivery_partner VARCHAR(100) DEFAULT 'Delhivery'");
        console.log("Migrated orders table with tracking_id and delivery_partner columns.");
      }
    } catch (e) {
      // Table doesn't exist yet, which is fine
    }

    // Schema check for notifications table to ensure type column exists
    try {
      const columns = await dbAll("SHOW COLUMNS FROM notifications");
      const hasType = columns.some(col => col.Field === 'type');
      if (!hasType) {
        await dbRun("ALTER TABLE notifications ADD COLUMN type VARCHAR(50) DEFAULT 'GENERAL'");
        console.log("Migrated notifications table with type column.");
      }
    } catch (e) {
      // Table doesn't exist yet, which is fine
    }

    // 3. Create tables using unified schemas for Auth + Storefront
    
    // Core users table matching auth controller enums and ID type
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('buyer', 'seller', 'admin') NOT NULL DEFAULT 'buyer',
        dob VARCHAR(50),
        gender VARCHAR(20),
        city VARCHAR(100),
        status ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'active',
        reward_points INT DEFAULT 0,
        monthly_savings INT DEFAULT 0,
        total_orders INT DEFAULT 0,
        avatar LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_phone (phone)
      ) ENGINE=InnoDB
    `);

    // buyer_profiles matching auth schema (user_id PK)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS buyer_profiles (
        user_id INT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        address TEXT,
        promo_emails BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // seller_profiles matching auth schema
    await dbRun(`
      CREATE TABLE IF NOT EXISTS seller_profiles (
        user_id INT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        business_name VARCHAR(150) NOT NULL,
        business_type VARCHAR(50),
        primary_category VARCHAR(50),
        gst_number VARCHAR(20) UNIQUE,
        business_address TEXT,
        bank_account VARCHAR(50),
        ifsc_code VARCHAR(20),
        tan_card_path VARCHAR(255),
        verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FULLTEXT INDEX idx_business_search (business_name)
      ) ENGINE=InnoDB
    `);

    await dbRun(`
      CREATE TABLE IF NOT EXISTS buyer_devices (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        device_type VARCHAR(20),
        device_token VARCHAR(255),
        created_at VARCHAR(50),
        updated_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Categories Table matching PDF design
    await dbRun(`
      CREATE TABLE IF NOT EXISTS categories (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        image_url VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1
      ) ENGINE=InnoDB
    `);

    // Products Table matching PDF design exactly
    await dbRun(`
      CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        owner_id INT,
        name VARCHAR(150) NOT NULL,
        sku VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        base_retail_price DECIMAL(10,2) NOT NULL,
        weight_gm INT,
        stock_qty INT DEFAULT 100,
        image_url VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB
    `);

    // Cart Table mapping product_id INT
    await dbRun(`
      CREATE TABLE IF NOT EXISTS cart (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        product_id INT,
        quantity INT,
        created_at VARCHAR(50),
        updated_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Wishlist Table mapping product_id INT
    await dbRun(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        product_id INT,
        created_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Customer Orders Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        order_number VARCHAR(50),
        total_amount INT,
        payment_status VARCHAR(50),
        order_status VARCHAR(50),
        delivery_date VARCHAR(50),
        tracking_id VARCHAR(100),
        delivery_partner VARCHAR(100) DEFAULT 'Delhivery',
        created_at VARCHAR(50),
        updated_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Order Items Table mapping product_id INT
    await dbRun(`
      CREATE TABLE IF NOT EXISTS order_items (
        id VARCHAR(50) PRIMARY KEY,
        order_id VARCHAR(50),
        product_id INT,
        quantity INT,
        price INT,
        subtotal INT,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Payments Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(50) PRIMARY KEY,
        order_id VARCHAR(50),
        payment_method VARCHAR(50),
        transaction_id VARCHAR(50),
        amount INT,
        payment_status VARCHAR(50),
        paid_at VARCHAR(50),
        created_at VARCHAR(50),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Reviews Table mapping product_id INT
    await dbRun(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        product_id INT,
        rating INT,
        review TEXT,
        created_at VARCHAR(50),
        updated_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Notifications Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        type VARCHAR(50) DEFAULT 'GENERAL',
        title VARCHAR(255),
        message TEXT,
        is_read BOOLEAN,
        created_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    await dbRun(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        plan_name VARCHAR(100),
        start_date VARCHAR(50),
        end_date VARCHAR(50),
        status VARCHAR(50),
        created_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await dbRun(`
      CREATE TABLE IF NOT EXISTS health_preferences (
        id VARCHAR(50) PRIMARY KEY,
        buyer_id INT,
        preference VARCHAR(100),
        created_at VARCHAR(50),
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Delivery Shipments table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS shipments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(50) NOT NULL,
        tracking_id VARCHAR(100) UNIQUE NOT NULL,
        carrier VARCHAR(100) DEFAULT 'Delhivery',
        status ENUM('PLACED', 'PACKING', 'ON_THE_WAY', 'ARRIVED', 'DELIVERED') DEFAULT 'PLACED',
        estimated_delivery VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    console.log('Database tables verified/created successfully.');

    // Seed default user if empty
    const userCount = await dbGet('SELECT COUNT(*) as cnt FROM users');
    if (userCount.cnt === 0) {
      // Seed default user 'ipsita@nutritiva.in' with password 'SecurePass@123'
      const hashedPass = await bcrypt.hash('SecurePass@123', 10);
      await dbRun(`
        INSERT INTO users (id, name, email, phone, password_hash, role, dob, gender, city, status, reward_points, monthly_savings, total_orders, avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [1, 'Ipsita Panda', 'ipsita@nutritiva.in', '+91 99887 76655', hashedPass, 'buyer', '1995-03-15', 'Female', 'Noida, Uttar Pradesh', 'active', 1450, 3250, 24, '']);

      await dbRun(`
        INSERT INTO buyer_profiles (user_id, full_name, address, promo_emails)
        VALUES (?, ?, ?, ?)
      `, [1, 'Ipsita Panda', 'Noida, Uttar Pradesh', true]);

      await dbRun(`
        INSERT INTO buyer_devices (id, buyer_id, device_type, device_token, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['dev_1', 1, 'iOS', 'ios_tok_123', new Date().toISOString(), new Date().toISOString()]);
      await dbRun(`
        INSERT INTO buyer_devices (id, buyer_id, device_type, device_token, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['dev_2', 1, 'Web', 'web_tok_456', new Date().toISOString(), new Date().toISOString()]);

      console.log('Seeded default user profile Ipsita.');
    }

    // Seed categories if empty
    const catCount = await dbGet('SELECT COUNT(*) as cnt FROM categories');
    if (catCount.cnt === 0) {
      const categoriesSeed = [
        { id: 1, name: 'Nuts & Dry Fruits', slug: 'nuts-dry-fruits', img: '/images/cat/nuts.png' },
        { id: 2, name: 'Seeds & Superfoods', slug: 'seeds-superfoods', img: '/images/cat/seeds.png' },
        { id: 3, name: 'Healthy Snacks', slug: 'healthy-snacks', img: '/images/cat/snacks.png' },
        { id: 4, name: 'Organic Food', slug: 'organic-food', img: '/images/cat/organic.png' },
        { id: 5, name: 'Spices & Herbs', slug: 'spices-herbs', img: '/images/cat/spices.png' },
        { id: 6, name: 'Honey & Sweeteners', slug: 'honey-sweeteners', img: '/images/cat/honey.png' },
        { id: 7, name: 'Wellness & Immunity', slug: 'wellness-immunity', img: '/images/cat/wellness.png' },
        { id: 8, name: 'Gift Packs', slug: 'gift-packs', img: '/images/cat/gifts.png' }
      ];
      for (const c of categoriesSeed) {
        await dbRun(`
          INSERT INTO categories (category_id, name, slug, image_url, is_active)
          VALUES (?, ?, ?, ?, 1)
        `, [c.id, c.name, c.slug, c.img]);
      }
      console.log('Seeded categories catalog.');
    }

    // Seed default products if empty
    const prodCount = await dbGet('SELECT COUNT(*) as cnt FROM products');
    if (prodCount.cnt === 0) {
      const initialProducts = [
        { id: 1, name: 'California Almonds', weight: 500, price: 599, originalPrice: 849, category_id: 1, image: 'almonds' },
        { id: 2, name: 'Roasted Cashews', weight: 500, price: 639, originalPrice: 749, category_id: 1, image: 'cashews' },
        { id: 3, name: 'Premium Walnuts', weight: 500, price: 679, originalPrice: 899, category_id: 1, image: 'walnuts' },
        { id: 4, name: 'Afghani Raisins', weight: 500, price: 279, originalPrice: 349, category_id: 1, image: 'raisins' },
        { id: 5, name: 'Roasted Pistachios', weight: 500, price: 899, originalPrice: 1099, category_id: 1, image: 'pistachios' },
        { id: 6, name: 'Chia Seeds', weight: 250, price: 199, originalPrice: 249, category_id: 2, image: 'seeds' },
        { id: 7, name: 'Pumpkin Seeds', weight: 250, price: 249, originalPrice: 299, category_id: 2, image: 'seeds' },
        { id: 8, name: 'Flax Seeds', weight: 250, price: 129, originalPrice: 169, category_id: 2, image: 'seeds' },
        { id: 9, name: 'Roasted Makhana', weight: 150, price: 180, originalPrice: 240, category_id: 3, image: 'cashews' },
        { id: 10, name: 'Baked Beetroot Chips', weight: 100, price: 120, originalPrice: 150, category_id: 3, image: 'seeds' },
        { id: 11, name: 'Pink Himalayan Salt', weight: 1000, price: 139, originalPrice: 199, category_id: 4, image: 'spices' },
        { id: 12, name: 'Organic Quinoa', weight: 500, price: 299, originalPrice: 399, category_id: 4, image: 'seeds' },
        { id: 13, name: 'Organic Turmeric Powder', weight: 250, price: 99, originalPrice: 149, category_id: 5, image: 'spices' },
        { id: 14, name: 'Whole Black Pepper', weight: 200, price: 189, originalPrice: 249, category_id: 5, image: 'seeds' },
        { id: 15, name: 'Wild Forest Honey', weight: 500, price: 349, originalPrice: 449, category_id: 6, image: 'honey' },
        { id: 16, name: 'Organic Jaggery Powder', weight: 1000, price: 129, originalPrice: 179, category_id: 6, image: 'jaggery' },
        { id: 17, name: 'Giloy Amla Juice', weight: 1000, price: 289, originalPrice: 399, category_id: 7, image: 'juice' },
        { id: 18, name: 'Ashwagandha Capsules', weight: 120, price: 449, originalPrice: 599, category_id: 7, image: 'ashwagandha' },
        { id: 19, name: 'Royal Dry Fruit Gift Box', weight: 800, price: 1299, originalPrice: 1799, category_id: 8, image: 'hero_nuts_bowl' },
        { id: 20, name: 'Healthy Seeds Assortment Box', weight: 600, price: 799, originalPrice: 999, category_id: 8, image: 'hero_nuts_bowl' }
      ];

      for (const p of initialProducts) {
        await dbRun(`
          INSERT INTO products (product_id, category_id, owner_id, name, sku, description, base_retail_price, weight_gm, stock_qty, image_url, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        `, [
          p.id, 
          p.category_id,
          1, 
          p.name,
          `SKU-NUTR-${p.name.toUpperCase().replace(/ /g, '-')}`, 
          `Premium quality organic ${p.name} sourced directly from verified organic farms. Processed under hygienic conditions to preserve optimal freshness and nutritional value.`,
          p.price, 
          p.weight, 
          150,
          p.image
        ]);
      }
      console.log('Seeded products catalog.');
    }

    // Seed default orders & history if empty
    const orderCount = await dbGet('SELECT COUNT(*) as cnt FROM orders');
    const orderItemsCount = await dbGet('SELECT COUNT(*) as cnt FROM order_items');
    if (orderCount.cnt === 0 || orderItemsCount.cnt === 0) {
      await dbRun("SET FOREIGN_KEY_CHECKS = 0");
      await dbRun("DELETE FROM payments");
      await dbRun("DELETE FROM orders");
      await dbRun("DELETE FROM order_items");
      await dbRun("SET FOREIGN_KEY_CHECKS = 1");

      const defaultOrders = [
        { id: 'ord_1', buyer_id: 1, order_number: 'NT12458', total_amount: 899, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-03-01', created_at: '2025-02-28T14:30:00Z', updated_at: '2025-03-01T16:00:00Z' },
        { id: 'ord_2', buyer_id: 1, order_number: 'NT12457', total_amount: 639, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-02-25', created_at: '2025-02-24T09:15:00Z', updated_at: '2025-02-25T11:45:00Z' },
        { id: 'ord_3', buyer_id: 1, order_number: 'NT12456', total_amount: 499, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-02-15', created_at: '2025-02-14T18:20:00Z', updated_at: '2025-02-15T14:10:00Z' },
        { id: 'ord_4', buyer_id: 1, order_number: 'NT12455', total_amount: 1299, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-02-01', created_at: '2025-01-31T10:05:00Z', updated_at: '2025-02-01T13:30:00Z' },
        { id: 'ord_5', buyer_id: 1, order_number: 'NT12454', total_amount: 899, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-01-20', created_at: '2025-01-19T11:50:00Z', updated_at: '2025-01-20T16:20:00Z' }
      ];
      for (const o of defaultOrders) {
        await dbRun(`
          INSERT INTO orders (id, buyer_id, order_number, total_amount, payment_status, order_status, delivery_date, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [o.id, o.buyer_id, o.order_number, o.total_amount, o.payment_status, o.order_status, o.delivery_date, o.created_at, o.updated_at]);
      }

      const defaultOrderItems = [
        { id: 'oi_1', order_id: 'ord_1', product_id: 1, quantity: 1, price: 899, subtotal: 899 },
        { id: 'oi_2', order_id: 'ord_2', product_id: 2, quantity: 1, price: 639, subtotal: 639 },
        { id: 'oi_3', order_id: 'ord_3', product_id: 6, quantity: 1, price: 499, subtotal: 499 },
        { id: 'oi_4', order_id: 'ord_4', product_id: 19, quantity: 1, price: 1299, subtotal: 1299 },
        { id: 'oi_5', order_id: 'ord_5', product_id: 5, quantity: 1, price: 899, subtotal: 899 }
      ];
      for (const oi of defaultOrderItems) {
        await dbRun(`
          INSERT INTO order_items (id, order_id, product_id, quantity, price, subtotal)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price, oi.subtotal]);
      }

      const defaultPayments = [
        { id: 'pay_1', order_id: 'ord_1', payment_method: 'UPI', transaction_id: 'TXN1234567891', amount: 899, payment_status: 'SUCCESS', paid_at: '2025-02-28T14:31:00Z', created_at: '2025-02-28T14:30:05Z' },
        { id: 'pay_2', order_id: 'ord_2', payment_method: 'CREDIT_CARD', transaction_id: 'TXN1234567892', amount: 639, payment_status: 'SUCCESS', paid_at: '2025-02-24T09:16:00Z', created_at: '2025-02-24T09:15:05Z' },
        { id: 'pay_3', order_id: 'ord_3', payment_method: 'DEBIT_CARD', transaction_id: 'TXN1234567893', amount: 499, payment_status: 'SUCCESS', paid_at: '2025-02-14T18:21:00Z', created_at: '2025-02-14T18:20:05Z' },
        { id: 'pay_4', order_id: 'ord_4', payment_method: 'UPI', transaction_id: 'TXN1234567894', amount: 1299, payment_status: 'SUCCESS', paid_at: '2025-01-31T10:06:00Z', created_at: '2025-01-31T10:05:05Z' },
        { id: 'pay_5', order_id: 'ord_5', payment_method: 'NET_BANKING', transaction_id: 'TXN1234567895', amount: 899, payment_status: 'SUCCESS', paid_at: '2025-01-19T11:51:00Z', created_at: '2025-01-19T11:50:05Z' }
      ];
      for (const pay of defaultPayments) {
        await dbRun(`
          INSERT INTO payments (id, order_id, payment_method, transaction_id, amount, payment_status, paid_at, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [pay.id, pay.order_id, pay.payment_method, pay.transaction_id, pay.amount, pay.payment_status, pay.paid_at, pay.created_at]);
      }
      console.log('Seeded order and transaction logs.');
    }

    // Seed default reviews if empty
    const reviewCount = await dbGet('SELECT COUNT(*) as cnt FROM reviews');
    if (reviewCount.cnt === 0) {
      await dbRun(`
        INSERT INTO reviews (id, buyer_id, product_id, rating, review, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['rev_1', 1, 1, 5, 'Premium quality and perfectly roasted. Will buy again!', new Date().toISOString(), new Date().toISOString()]);
      await dbRun(`
        INSERT INTO reviews (id, buyer_id, product_id, rating, review, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['rev_2', 1, 19, 4, 'Great packaging, perfect for gifting.', new Date().toISOString(), new Date().toISOString()]);
      console.log('Seeded default reviews.');
    }

    // Seed notifications if empty
    const notifCount = await dbGet('SELECT COUNT(*) as cnt FROM notifications');
    if (notifCount.cnt === 0) {
      await dbRun(`
        INSERT INTO notifications (id, buyer_id, title, message, is_read, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['not_1', 1, 'Order Delivered', 'Your order NT12458 has been delivered.', false, new Date().toISOString()]);
      await dbRun(`
        INSERT INTO notifications (id, buyer_id, title, message, is_read, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['not_2', 1, 'New Offer!', 'Get 40% OFF on all seeds and superfoods today.', false, new Date().toISOString()]);
      console.log('Seeded default notifications.');
    }

    // Seed subscriptions if empty
    const subCount = await dbGet('SELECT COUNT(*) as cnt FROM subscriptions');
    if (subCount.cnt === 0) {
      await dbRun(`
        INSERT INTO subscriptions (id, buyer_id, plan_name, start_date, end_date, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['sub_1', 1, 'Nutritiva VIP Club', '2025-01-01', '2026-12-31', 'ACTIVE', new Date().toISOString()]);
      await dbRun(`
        INSERT INTO subscriptions (id, buyer_id, plan_name, start_date, end_date, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, ['sub_2', 1, 'Monthly Wellness Box', '2025-02-15', '2025-08-15', 'ACTIVE', new Date().toISOString()]);
      console.log('Seeded default subscriptions.');
    }

    // Seed health preferences if empty
    const hpCount = await dbGet('SELECT COUNT(*) as cnt FROM health_preferences');
    if (hpCount.cnt === 0) {
      await dbRun(`
        INSERT INTO health_preferences (id, buyer_id, preference, created_at)
        VALUES (?, ?, ?, ?)
      `, ['hp_1', 1, 'Vegetarian', new Date().toISOString()]);
      await dbRun(`
        INSERT INTO health_preferences (id, buyer_id, preference, created_at)
        VALUES (?, ?, ?, ?)
      `, ['hp_2', 1, 'High Protein', new Date().toISOString()]);
      console.log('Seeded default health preferences.');
    }

  } catch (err) {
    console.error('Error during database initialization:', err);
    throw err;
  }
};

module.exports = {
  pool,
  dbRun,
  dbAll,
  dbGet,
  initDB
};
