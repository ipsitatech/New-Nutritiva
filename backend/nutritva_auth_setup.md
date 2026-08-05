# Nutritva Auth Backend — Developer Setup Guide

> **Stack:** Node.js · Express · MySQL · JWT · Bcrypt · Multer  
> **Share this file** with any developer joining the project.

---

## ✅ Prerequisites

Make sure the following are installed on your machine before starting:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18+ | https://nodejs.org |
| MySQL | v8.0+ | https://dev.mysql.com/downloads |
| Postman (for testing) | Latest | https://postman.com/downloads |

---

## 📁 Final Folder Structure

```
backend/
├── config/
│   └── db.js              ← MySQL connection pool
├── controllers/
│   └── authController.js  ← signup & signin logic
├── middleware/
│   └── (empty for now — auth middleware goes here)
├── models/
│   └── (empty for now — future ORM models)
├── routes/
│   └── authRoutes.js      ← POST /signup, POST /signin
├── uploads/               ← TAN card files land here (auto-created)
├── .env                   ← Secret config (NEVER commit this)
├── .gitignore
├── index.js               ← Server entry point
└── package.json
```

---

## STEP 1 — Clone / Pull the Repo

```bash
git clone <repo-url>
cd Nutritva/backend
```

---

## STEP 2 — Install Dependencies

Run this **once** after cloning:

```bash
npm install mysql2 jsonwebtoken bcryptjs cors dotenv multer
```

---

## STEP 3 — Configure Environment Variables

Create a `.env` file in the `backend/` root (this file is gitignored, so each developer must create their own):

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=nutritva_db
JWT_SECRET=replace_this_with_a_long_random_string_minimum_32_chars
```

> [!CAUTION]
> Never commit `.env` to Git. It contains your database password and JWT secret.

---

## STEP 4 — MySQL Database Setup (Execute in Order)

Open **MySQL Workbench** or your MySQL CLI and run these queries **in the exact order listed below**.

### 4.1 — Create the Database

```sql
CREATE DATABASE IF NOT EXISTS nutritva_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nutritva_db;
```

### 4.2 — Create the `users` Table (Core Auth Table)

This is the single table used for login — both Buyers and Sellers authenticate here.

```sql
CREATE TABLE users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone           VARCHAR(20)  UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            ENUM('buyer', 'seller', 'admin') NOT NULL,
    status          ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'active',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_phone (phone)
) ENGINE=InnoDB;
```

> [!NOTE]
> Sellers get `status = 'pending'` on signup (pending admin review). Buyers get `status = 'active'` immediately. The indexes on `email` and `phone` make Sign In queries extremely fast.

### 4.3 — Create the `buyer_profiles` Table

```sql
CREATE TABLE buyer_profiles (
    user_id         INT PRIMARY KEY,
    full_name       VARCHAR(100) NOT NULL,
    address         TEXT,
    promo_emails    BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

### 4.4 — Create the `seller_profiles` Table

```sql
CREATE TABLE seller_profiles (
    user_id               INT PRIMARY KEY,
    first_name            VARCHAR(50)  NOT NULL,
    last_name             VARCHAR(50)  NOT NULL,
    business_name         VARCHAR(150) NOT NULL,
    business_type         VARCHAR(50),
    primary_category      VARCHAR(50),
    gst_number            VARCHAR(20)  UNIQUE,
    business_address      TEXT,
    bank_account          VARCHAR(50),
    ifsc_code             VARCHAR(20),
    tan_card_path         VARCHAR(255),
    verification_status   ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FULLTEXT INDEX idx_business_search (business_name)
) ENGINE=InnoDB;
```

> [!NOTE]
> `ON DELETE CASCADE` means if a user is deleted from `users`, their profile is automatically deleted too — no orphan data. The `FULLTEXT` index on `business_name` powers fast search for sellers.

### 4.5 — Verify Tables Were Created

```sql
SHOW TABLES;
DESCRIBE users;
DESCRIBE buyer_profiles;
DESCRIBE seller_profiles;
```

---

## STEP 5 — Start the Server

```bash
# Standard start
npm start

# Development mode with auto-restart (install nodemon first if needed)
npm run dev
```

You should see:
```
Nutritva Backend running on port 5000
```

---

## STEP 6 — Testing the API

### About the Transactions

You **do not manually execute** the transactional SQL queries (the ones from Step 4.1–4.4 with `START TRANSACTION`). Those are **embedded inside the `authController.js`** and run automatically every time a signup request is made. The flow is:

```
POST /api/auth/signup
    → beginTransaction()
    → INSERT into users
    → INSERT into buyer_profiles OR seller_profiles
    → commit()  ← only if both inserts succeed
    → rollback() ← if anything fails (no broken data ever saved)
```

---

### 6.1 — Buyer Signup

**Endpoint:** `POST http://localhost:5000/api/auth/signup`  
**Content-Type:** `application/json`

```json
{
  "role": "buyer",
  "email": "john@example.com",
  "phone": "+919876543210",
  "password": "SecurePass@123",
  "fullName": "John Doe",
  "address": "Flat 12, Green Lane, Mumbai",
  "promoEmails": true
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully"
}
```

---

### 6.2 — Seller Signup

**Endpoint:** `POST http://localhost:5000/api/auth/signup`  
**Content-Type:** `multipart/form-data` ← **Important: Must be form-data because of file upload**

| Key | Value |
|---|---|
| `role` | `seller` |
| `email` | `contact@greenvalley.com` |
| `phone` | `+919123456789` |
| `password` | `SellerPass@456` |
| `firstName` | `Jane` |
| `lastName` | `Doe` |
| `businessName` | `Green Valley Farms` |
| `businessType` | `Wholesaler` |
| `primaryCategory` | `Dry Fruits` |
| `gstNumber` | `22AAAAA0000A1Z5` |
| `address` | `Warehouse 5, APMC, Navi Mumbai` |
| `bankAccount` | `001234567890` |
| `ifscCode` | `SBIN0001234` |
| `tanCard` | *(attach any PDF or image file)* |

**Expected Response (201):**
```json
{
  "message": "User registered successfully"
}
```

> [!NOTE]
> In Postman: go to **Body → form-data**. For `tanCard`, change the type from "Text" to "File" using the dropdown on the right side of the key field.

---

### 6.3 — Sign In (Both Roles)

**Endpoint:** `POST http://localhost:5000/api/auth/signin`  
**Content-Type:** `application/json`

```json
{
  "emailOrPhone": "john@example.com",
  "password": "SecurePass@123"
}
```

Can also sign in with phone number:

```json
{
  "emailOrPhone": "+919876543210",
  "password": "SecurePass@123"
}
```

**Expected Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "buyer",
  "status": "active"
}
```

> [!TIP]
> Save the `token` from the response. For any protected route in the future, send it as:  
> `Authorization: Bearer <token>`

---

### 6.4 — Testing with cURL (Alternative to Postman)

**Buyer Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"role":"buyer","email":"test@example.com","phone":"+911234567890","password":"Test@123","fullName":"Test User","address":"123 Test Street"}'
```

**Sign In:**
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"emailOrPhone":"test@example.com","password":"Test@123"}'
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `ER_ACCESS_DENIED_ERROR` | Wrong DB credentials | Check `.env` DB_USER / DB_PASSWORD |
| `ER_NO_SUCH_TABLE` | Tables not created | Run Step 4 queries in MySQL |
| `ER_DUP_ENTRY` | Email or phone already registered | Use a different email/phone |
| `Cannot find module 'mysql2'` | Packages not installed | Run `npm install` |
| `JWT_SECRET is not defined` | `.env` not loaded | Ensure `.env` exists in `backend/` root |
| `listen EADDRINUSE :5000` | Port already in use | Change `PORT` in `.env` to `5001` |
