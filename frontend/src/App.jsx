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
  const { currentPage, setCategoryPageKey, setCurrentPage } = useApp();

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
