import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrdersPage from "./pages/orders/OrdersPage.jsx";

import Layout from "./components/layout/Layout.jsx";
import CorporateBulkOrders from "./components/marketing/CorporateBulkOrders.jsx";
import FAQ from "./components/marketing/FAQ.jsx";

import Signup from "./pages/auth/Signup.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={
            <Layout topBarVariant="landing">
              <LandingPage />
            </Layout>
          }
        />

        {/* Authentication */}
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/:role" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Seller Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Orders */}
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/dashboard/orders" element={<OrdersPage />} />

        {/* Buyer Pages */}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;