import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CorporateBulkOrders from "./components/CorporateBulkOrders.jsx";
import FAQ from "./components/FAQ.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Layout from "./components/Layout.jsx";

import Signup from "./pages/Signup.jsx";
import SignIn from "./pages/SignIn.jsx";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Layout topBarVariant="landing">
              <LandingPage />
            </Layout>
          }
        />

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;