# Nutritva Backend 🚀

This is the backend service for the Nutritva platform, built with Node.js, Express, and MySQL. It handles authentication, profile management, and OTP-based password resets.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Auth:** JWT (JSON Web Tokens), Bcrypt.js, Google OAuth
- **Email:** Nodemailer (Gmail)

---

## 📋 Prerequisites
- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **NPM** (installed with Node.js)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Nutritva/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the `backend/` root directory and fill in the following details:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nutritva_db
JWT_SECRET=generate_a_long_random_string_here
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

#### 💡 How to get `EMAIL_PASS` (Gmail App Password):
1. Go to your [Google Account Settings](https://myaccount.google.com/).
2. Navigate to **Security**.
3. Enable **2-Step Verification**.
4. Search for **App Passwords**.
5. Select "Mail" and "Other (Custom Name)" like "Nutritva Backend".
6. Copy the 16-character code and paste it into `EMAIL_PASS`.

---

### 4. Database Setup
Execute the following SQL queries in your MySQL client (Workbench or CLI) to set up the database and tables:

```sql
-- 1. Create Database
CREATE DATABASE IF NOT EXISTS nutritva_db;
USE nutritva_db;

-- 2. Users Table
CREATE TABLE users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone           VARCHAR(20)  UNIQUE NULL, -- Nullable for Google Login
    password_hash   VARCHAR(255) NULL,        -- Nullable for Google Login
    role            ENUM('buyer', 'seller', 'admin') NOT NULL DEFAULT 'buyer',
    status          ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'active',
    otp             VARCHAR(6)   NULL,
    otp_expiry      DATETIME     NULL,
    otp_resend_count INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Buyer Profiles
CREATE TABLE buyer_profiles (
    user_id         INT PRIMARY KEY,
    full_name       VARCHAR(100) NOT NULL,
    address         TEXT,
    promo_emails    BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Seller Profiles
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

---

### 5. Start the Server

**Development Mode (Auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Your server will be running at `http://localhost:5000`.

---

## 🔐 Google OAuth Setup (For Frontend & Backend)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new Project.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**.
5. Set Application Type to **Web application**.
6. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173` (Vite Default)
   - `http://localhost:5000`
7. Under **Authorized redirect URIs**, add:
   - `http://localhost:5173`
8. Click **Create** and copy your **Client ID**.
9. Paste this Client ID into the Frontend `main.jsx` file.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new Buyer or Seller |
| POST | `/api/auth/signin` | Login with Email/Phone |
| POST | `/api/auth/google` | Sign In/Up with Google |
| POST | `/api/auth/forgot-password` | Request OTP for password reset |
| POST | `/api/auth/verify-otp` | Verify the 6-digit OTP |
| POST | `/api/auth/reset-password` | Set a new password after verification |
