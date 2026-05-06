import HeroSection from "../components/HeroSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx"; 
import Footer from "../components/Footer.jsx";
import TopBar from "../components/TopBar.jsx";
import BottomStrip from "../components/BottomStrip.jsx";
import HotDealsSection from "../components/HotDealsSection.jsx";

function LandingPage() {
  return (
    <>
      <TopBar />
      <HeroSection />
      <BottomStrip />
      <FeaturesSection />
      <HotDealsSection />
      <Footer />
      
    </>
  );
}

export default LandingPage;