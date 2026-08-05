import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Master pages
import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CorporateBulkOrders from "./components/marketing/CorporateBulkOrders.jsx";
import FAQ from "./components/marketing/FAQ.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Layout from "./components/layout/Layout.jsx";
import Signup from "./pages/auth/Signup.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";

// Buyer After Signup pages (our branch)
import { AppProvider, useApp } from './services/AppContext';
import Storefront from './pages/Storefront';
import Dashboard from './pages/Dashboard';
import PromoPage from './pages/PromoPage';
import CategoryPage from './pages/CategoryPage';

const MainLayout = () => {
  const { currentPage, setCategoryPageKey, setCurrentPage, isLoading, errorMessage, fetchInitialData } = useApp();

  /* Listen for cross-category navigation from CategoryPage's "Explore More" buttons */
  useEffect(() => {
    const handler = (e) => {
      setCategoryPageKey(e.detail);
      setCurrentPage('category');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('switch-category', handler);
    return () => window.removeEventListener('switch-category', handler);
  }, [setCategoryPageKey, setCurrentPage]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center max-w-sm">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Loading Nutritiva</h2>
          <p className="text-xs text-slate-500 font-semibold animate-pulse">Syncing with our healthy organic catalog...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-2xl border border-slate-100 p-8 max-w-sm shadow-xs flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 text-2xl mb-4">
            ⚠️
          </div>
          <h2 className="text-lg font-black text-slate-800 mb-2">Connection Problem</h2>
          <p className="text-xs text-slate-500 font-semibold mb-6 leading-relaxed">
            {errorMessage}
          </p>
          <button
            onClick={() => fetchInitialData()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            Retry Connection 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen transition-colors duration-300">
      {currentPage === 'store'     && <Storefront />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'promo'     && <PromoPage />}
      {currentPage === 'category'  && <CategoryPage />}
    </div>
  );
};

const BuyerApp = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

const HomeRoute = () => {
  // Check if user is logged in as a buyer
  const token = localStorage.getItem("nutritva_token");
  const role = localStorage.getItem("nutritva_role");
  
  if (token && role === "buyer") {
    return <BuyerApp />;
  }
  
  return (
    <Layout topBarVariant="landing">
      <LandingPage />
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/:role" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/corporate"
          element={
            <Layout>
              <CorporateBulkOrders />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
