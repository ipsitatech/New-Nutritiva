# Nutritva Frontend 🥗

The frontend application for Nutritva, built with **React**, **Vite**, and **Tailwind CSS**. It features a modern, responsive design with role-based authentication and a premium bento-style stats dashboard.

---

## 🛠️ Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, Vanilla CSS (Design System)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Auth:** @react-oauth/google

---

## 📋 Prerequisites
- **Node.js** (v18 or higher)
- **NPM** (installed with Node.js)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Nutritva/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Google OAuth
To enable "Continue with Google", you need to configure your Client ID:

1. Open `src/main.jsx`.
2. Locate the `GOOGLE_CLIENT_ID` constant (around line 20).
3. Replace the string with your actual Client ID from [Google Cloud Console](https://console.cloud.google.com/).

```javascript
const GOOGLE_CLIENT_ID = "your-client-id-here.apps.googleusercontent.com";
```

> [!TIP]
> See the **Backend README** for detailed instructions on how to generate this Client ID in the Google Cloud Console.

---

### 4. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📂 Key Folders
- `src/components/`: Reusable UI components (StatsDashboard, Layout, TopBar, etc.)
- `src/pages/`: Page-level components (LandingPage, SignIn, Signup, etc.)
- `src/services/`: API communication logic (authService.js)
- `src/assets/`: Images and static assets

---

## 🎨 Design System
The project uses a premium design system defined in `src/style.css` and `src/index.css`.
- **Primary Color:** `#1A6B3C` (Nutritva Green)
- **Typography:** DM Sans, Lora
- **Components:** Glassmorphism, Bento-grid layouts, and smooth micro-animations.

---

## 📡 API Connection
By default, the frontend communicates with the backend at `http://localhost:5000/api`. Ensure your backend is running for authentication and data features to work.
