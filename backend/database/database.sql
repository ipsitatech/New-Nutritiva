-- ==========================================================
-- NUTRITIVA DATABASE SCHEMA & SEED DATA (UPDATED PDF DESIGN)
-- For MySQL / MariaDB Local Setup
-- ==========================================================

CREATE DATABASE IF NOT EXISTS nutritiva;
USE nutritiva;

-- 1. Core Users Table
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
) ENGINE=InnoDB;

-- 2. Buyer Profiles
CREATE TABLE IF NOT EXISTS buyer_profiles (
  user_id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  address TEXT,
  promo_emails BOOLEAN DEFAULT FALSE,
  loyalty_points INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Seller Profiles
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
  wallet_balance DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FULLTEXT INDEX idx_business_search (business_name)
) ENGINE=InnoDB;

-- 4. Buyer Device Tokens
CREATE TABLE IF NOT EXISTS buyer_devices (
  id VARCHAR(50) PRIMARY KEY,
  buyer_id INT,
  device_type VARCHAR(20),
  device_token VARCHAR(255),
  created_at VARCHAR(50),
  updated_at VARCHAR(50),
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  image_url VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

-- 6. Products Catalog Table (Aligned with PDF)
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
) ENGINE=InnoDB;

-- 7. Cart Items Table
CREATE TABLE IF NOT EXISTS cart (
  id VARCHAR(50) PRIMARY KEY,
  buyer_id INT,
  product_id INT,
  quantity INT,
  created_at VARCHAR(50),
  updated_at VARCHAR(50),
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Wishlist / Favorites Table
CREATE TABLE IF NOT EXISTS wishlist (
  id VARCHAR(50) PRIMARY KEY,
  buyer_id INT,
  product_id INT,
  created_at VARCHAR(50),
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. Customer Orders Table
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
) ENGINE=InnoDB;

-- 10. Order Items Details Table
CREATE TABLE IF NOT EXISTS order_items (
  id VARCHAR(50) PRIMARY KEY,
  order_id VARCHAR(50),
  product_id INT,
  quantity INT,
  price INT,
  subtotal INT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 11. Payments Transactions Table
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
) ENGINE=InnoDB;

-- 12. Reviews Table
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
) ENGINE=InnoDB;

-- 13. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(50) PRIMARY KEY,
  buyer_id INT,
  title VARCHAR(255),
  message TEXT,
  is_read BOOLEAN,
  created_at VARCHAR(50),
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ==========================================================
-- SEED DATA INSERTIONS
-- ==========================================================

-- Seed default buyer user 'ipsita@nutritiva.in'
INSERT INTO users (id, name, email, phone, password_hash, role, dob, gender, city, status, reward_points, monthly_savings, total_orders, avatar)
VALUES (1, 'Ipsita Panda', 'ipsita@nutritiva.in', '+91 99887 76655', '$2a$10$w6D9tN.X31c7u4q9x3t/7OQ28q9JzB2i7U26b1EaZ1.O3xO0n8482', 'buyer', '1995-03-15', 'Female', 'Noida, Uttar Pradesh', 'active', 1450, 3250, 24, '');

INSERT INTO buyer_profiles (user_id, full_name, address, promo_emails, loyalty_points)
VALUES (1, 'Ipsita Panda', 'Flat 402, Block C, Green Apartments, Sector 62, Noida, Uttar Pradesh - 201301', true, 150);

INSERT INTO buyer_devices (id, buyer_id, device_type, device_token, created_at, updated_at)
VALUES 
('dev_1', 1, 'iOS', 'ios_tok_123', '2026-06-29T17:00:00Z', '2026-06-29T17:00:00Z'),
('dev_2', 1, 'Web', 'web_tok_456', '2026-06-29T17:00:00Z', '2026-06-29T17:00:00Z');

-- Seed Category Listings
INSERT INTO categories (category_id, name, slug, image_url, is_active)
VALUES
(1, 'Nuts & Dry Fruits', 'nuts-dry-fruits', '/images/cat/nuts.png', 1),
(2, 'Seeds & Superfoods', 'seeds-superfoods', '/images/cat/seeds.png', 1),
(3, 'Healthy Snacks', 'healthy-snacks', '/images/cat/snacks.png', 1),
(4, 'Organic Food', 'organic-food', '/images/cat/organic.png', 1),
(5, 'Spices & Herbs', 'spices-herbs', '/images/cat/spices.png', 1),
(6, 'Honey & Sweeteners', 'honey-sweeteners', '/images/cat/honey.png', 1),
(7, 'Wellness & Immunity', 'wellness-immunity', '/images/cat/wellness.png', 1),
(8, 'Gift Packs', 'gift-packs', '/images/cat/gifts.png', 1);

-- Seed Products Catalog
INSERT INTO products (product_id, category_id, owner_id, name, sku, description, base_retail_price, weight_gm, stock_qty, image_url, is_active)
VALUES
(1, 1, 1, 'California Almonds', 'SKU-NUTR-CALIFORNIA-ALMONDS', 'Premium quality organic California Almonds loaded with nutrients.', 599.00, 500, 150, 'almonds', 1),
(2, 1, 1, 'Roasted Cashews', 'SKU-NUTR-ROASTED-CASHEWS', 'Premium quality organic Roasted Cashews loaded with nutrients.', 639.00, 500, 150, 'cashews', 1),
(3, 1, 1, 'Premium Walnuts', 'SKU-NUTR-PREMIUM-WALNUTS', 'Premium quality organic Premium Walnuts loaded with nutrients.', 679.00, 500, 150, 'walnuts', 1),
(4, 1, 1, 'Afghani Raisins', 'SKU-NUTR-AFGHANI-RAISINS', 'Premium quality organic Afghani Raisins loaded with nutrients.', 279.00, 500, 150, 'raisins', 1),
(5, 1, 1, 'Roasted Pistachios', 'SKU-NUTR-ROASTED-PISTACHIOS', 'Premium quality organic Roasted Pistachios loaded with nutrients.', 899.00, 500, 150, 'pistachios', 1),
(6, 2, 1, 'Chia Seeds', 'SKU-NUTR-CHIA-SEEDS', 'Premium quality organic Chia Seeds loaded with nutrients.', 199.00, 250, 150, 'seeds', 1),
(7, 2, 1, 'Pumpkin Seeds', 'SKU-NUTR-PUMPKIN-SEEDS', 'Premium quality organic Pumpkin Seeds loaded with nutrients.', 249.00, 250, 150, 'pumpkin_seeds', 1),
(8, 2, 1, 'Flax Seeds', 'SKU-NUTR-FLAX-SEEDS', 'Premium quality organic Flax Seeds loaded with nutrients.', 129.00, 250, 150, 'flax_seeds', 1),
(9, 3, 1, 'Roasted Makhana', 'SKU-NUTR-ROASTED-MAKHANA', 'Premium quality organic Roasted Makhana loaded with nutrients.', 180.00, 150, 150, 'makhana', 1),
(10, 3, 1, 'Baked Beetroot Chips', 'SKU-NUTR-BAKED-BEETROOT-CHIPS', 'Premium quality organic Baked Beetroot Chips loaded with nutrients.', 120.00, 100, 150, 'beetroot_chips', 1),
(11, 4, 1, 'Pink Himalayan Salt', 'SKU-NUTR-PINK-HIMALAYAN-SALT', 'Premium quality organic Pink Himalayan Salt loaded with nutrients.', 139.00, 1000, 150, 'himalayan_salt', 1),
(12, 4, 1, 'Organic Quinoa', 'SKU-NUTR-ORGANIC-QUINOA', 'Premium quality organic Organic Quinoa loaded with nutrients.', 299.00, 500, 150, 'quinoa', 1),
(13, 5, 1, 'Organic Turmeric Powder', 'SKU-NUTR-ORGANIC-TURMERIC-POWDER', 'Premium quality organic Organic Turmeric Powder loaded with nutrients.', 99.00, 250, 150, 'turmeric', 1),
(14, 5, 1, 'Whole Black Pepper', 'SKU-NUTR-WHOLE-BLACK-PEPPER', 'Premium quality organic Whole Black Pepper loaded with nutrients.', 189.00, 200, 150, 'pepper', 1),
(15, 6, 1, 'Wild Forest Honey', 'SKU-NUTR-WILD-FOREST-HONEY', 'Premium quality organic Wild Forest Honey loaded with nutrients.', 349.00, 500, 150, 'honey', 1),
(16, 6, 1, 'Organic Jaggery Powder', 'SKU-NUTR-ORGANIC-JAGGERY-POWDER', 'Premium quality organic Organic Jaggery Powder loaded with nutrients.', 129.00, 1000, 150, 'jaggery', 1),
(17, 7, 1, 'Giloy Amla Juice', 'SKU-NUTR-GILOY-AMLA-JUICE', 'Premium quality organic Giloy Amla Juice loaded with nutrients.', 289.00, 1000, 150, 'juice', 1),
(18, 7, 1, 'Ashwagandha Capsules', 'SKU-NUTR-ASHWAGANDHA-CAPSULES', 'Premium quality organic Ashwagandha Capsules loaded with nutrients.', 449.00, 120, 150, 'ashwagandha', 1),
(19, 8, 1, 'Royal Dry Fruit Gift Box', 'SKU-NUTR-ROYAL-DRY-FRUIT-GIFT-BOX', 'Premium quality organic Royal Dry Fruit Gift Box loaded with nutrients.', 1299.00, 800, 150, 'giftbox', 1),
(20, 8, 1, 'Healthy Seeds Assortment Box', 'SKU-NUTR-HEALTHY-SEEDS-ASSORTMENT-BOX', 'Premium quality organic Healthy Seeds Assortment Box loaded with nutrients.', 799.00, 600, 150, 'seedsbox', 1);

-- Seed Mock Order History
INSERT INTO orders (id, buyer_id, order_number, total_amount, payment_status, order_status, delivery_date, created_at, updated_at)
VALUES 
('ord_1', 1, 'NT12458', 899, 'PAID', 'DELIVERED', '2025-03-01', '2025-02-28T14:30:00Z', '2025-03-01T16:00:00Z'),
('ord_2', 1, 'NT12457', 639, 'PAID', 'DELIVERED', '2025-02-25', '2025-02-24T09:15:00Z', '2025-02-25T11:45:00Z'),
('ord_3', 1, 'NT12456', 499, 'PAID', 'DELIVERED', '2025-02-15', '2025-02-14T18:20:00Z', '2025-02-15T14:10:00Z'),
('ord_4', 1, 'NT12455', 1299, 'PAID', 'DELIVERED', '2025-02-01', '2025-01-31T10:05:00Z', '2025-02-01T13:30:00Z'),
('ord_5', 1, 'NT12454', 899, 'PAID', 'DELIVERED', '2025-01-20', '2025-01-19T11:50:00Z', '2025-01-20T16:20:00Z');

-- Seed Mock Order Items
INSERT INTO order_items (id, order_id, product_id, quantity, price, subtotal)
VALUES 
('oi_1', 'ord_1', 1, 1, 899, 899),
('oi_2', 'ord_2', 2, 1, 639, 639),
('oi_3', 'ord_3', 6, 1, 499, 499),
('oi_4', 'ord_4', 19, 1, 1299, 1299),
('oi_5', 'ord_5', 5, 1, 899, 899);

-- Seed Mock Payments
INSERT INTO payments (id, order_id, payment_method, transaction_id, amount, payment_status, paid_at, created_at)
VALUES 
('pay_1', 'ord_1', 'UPI', 'TXN1234567891', 899, 'SUCCESS', '2025-02-28T14:31:00Z', '2025-02-28T14:30:05Z'),
('pay_2', 'ord_2', 'CREDIT_CARD', 'TXN1234567892', 639, 'SUCCESS', '2025-02-24T09:16:00Z', '2025-02-24T09:15:05Z'),
('pay_3', 'ord_3', 'DEBIT_CARD', 'TXN1234567893', 499, 'SUCCESS', '2025-02-14T18:21:00Z', '2025-02-14T18:20:05Z'),
('pay_4', 'ord_4', 'UPI', 'TXN1234567894', 1299, 'SUCCESS', '2025-01-31T10:06:00Z', '2025-01-31T10:05:05Z'),
('pay_5', 'ord_5', 'NET_BANKING', 'TXN1234567895', 899, 'SUCCESS', '2025-01-19T11:51:00Z', '2025-01-19T11:50:05Z');

-- Seed Mock Reviews
INSERT INTO reviews (id, buyer_id, product_id, rating, review, created_at, updated_at)
VALUES 
('rev_1', 1, 1, 5, 'Premium quality and perfectly roasted. Will buy again!', '2026-06-29T17:00:00Z', '2026-06-29T17:00:00Z'),
('rev_2', 1, 19, 4, 'Great packaging, perfect for gifting.', '2026-06-29T17:00:00Z', '2026-06-29T17:00:00Z');
