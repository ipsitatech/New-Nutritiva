# Nutritva - Premium Healthy Foods E-Commerce Store

Nutritva is a high-performance, full-stack e-commerce web application dedicated to premium healthy foods, organic snacks, dry fruits, and seeds. The platform features a responsive design, interactive shopping cart, dynamic search filters, and secure user account authentication.

## 🚀 Key Features

*   **Premium & Responsive UI**: Clean, modern storefront built with React and custom CSS, optimized for mobile, tablet, and desktop screens.
*   **Secure Authentication**: JWT-based login (Bearer tokens) and account registration with hashed passwords (Bcrypt).
*   **Secure OTP Recovery**: Database-integrated 6-digit cryptographic OTP generation for password resets with active request rate-limiting.
*   **Dynamic Search & Filtering**: Multi-faceted search index matching queries across product names, descriptions, and category hierarchies instantly.
*   **Cart & Wishlist Systems**: Real-time state synchronization for cart updates (add, modify quantities, remove) and fav/wishlist management connected to a MySQL backend.
*   **Automated Relational Database**: Structured schemas matching entity relationships for users, categories, products, orders, reviews, and wishlists.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), JavaScript (ES6+), Vanilla CSS
*   **Backend**: Node.js, Express.js
*   **Database**: MySQL (Connection pooling, transactional queries)
*   **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
