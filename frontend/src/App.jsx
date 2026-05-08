import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CorporateBulkOrders from "./components/CorporateBulkOrders.jsx";
import FAQ from "./components/FAQ.jsx";

// Assuming these exist since you tried to use them below
// import FeaturesSection from './components/FeaturesSection'; 
// import SubscriptionPage from './components/SubscriptionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        
        {/* New Pages */}
        <Route path="/corporate" element={<CorporateBulkOrders />} />
        <Route path="/faq" element={<FAQ />} />

        {/* If you want Features/Subscription as standalone routes: */}
        {/* <Route path="/features" element={<FeaturesSection />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;