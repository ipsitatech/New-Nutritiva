# 🌿 Nutritva - Premium Healthy Foods E-Commerce Store

Nutritva is a high-performance, **Full-Stack E-Commerce web application** dedicated to premium healthy foods, organic snacks, dry fruits, and seeds. The platform delivers a modern, high-conversion shopping experience featuring real-time cart synchronization, secure authentication, and a responsive design.

---

## 🚀 Key Features

*   **📱 Premium & Responsive UI**: Mobile-first storefront built with **React** and styled dynamically using **Tailwind CSS**.
*   **🔐 Secure Authentication**: JWT-based login (Bearer tokens) and account registration with hashed credentials using **Bcrypt**.
*   **✉️ Secure OTP Recovery**: Database-integrated 6-digit cryptographic OTP generation for password resets with active rate-limiting cooldowns.
*   **🔍 Smart Search & Filtering**: Multi-faceted search index matching queries across product names, descriptions, and category hierarchies instantly.
*   **🛒 Cart & Wishlist Sync**: Instant state management for cart operations (add, modify quantities, remove) and wishlist toggling connected to a **MySQL** backend.
*   **📊 Relational DB Mapping**: Structured schema architecture optimized for users, categories, products, orders, reviews, and wishlists.

---

## 🛠️ Tech Stack

### Frontend
*   **Core**: React (Vite), JavaScript (ES6+)
*   **Styling**: Tailwind CSS (Utility-first responsive design)

### Backend
*   **Runtime**: Node.js
*   **API Framework**: Express.js
*   **Database**: MySQL (Connection pooling, transactional queries)

### Security
*   **Authorization**: JSON Web Tokens (JWT)
*   **Cryptography**: Bcrypt.js (Password hashing)
