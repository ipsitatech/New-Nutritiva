import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
// import FeaturesSection from './FeaturesSection';
// import SubscriptionPage from './SubscriptionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
    <div>
      <FeaturesSection />
      <SubscriptionPage/>
    </div>
  
}

export default App;
