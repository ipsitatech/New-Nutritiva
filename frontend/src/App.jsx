import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CorporateBulkOrders from "./components/CorporateBulkOrders.jsx";
import FAQ from "./components/FAQ.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Layout from "./components/Layout.jsx";

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