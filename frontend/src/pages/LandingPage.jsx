import HeroSection from "../components/HeroSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx"; 
import Footer from "../components/Footer.jsx";
import TopBar from "../components/TopBar.jsx";
import BottomStrip from "../components/BottomStrip.jsx";
import HotDealsSection from "../components/HotDealsSection.jsx";
import SubscriptionPage from "../components/SubscriptionPage.jsx";
import HamperSection from "../components/HamperSection.jsx";
import CorporateBulkOrders from "../components/CorporateBulkOrders.jsx";
import FAQ from "../components/FAQ.jsx";
import Categories from "../components/Categories.jsx";
import Testimonials from "../components/Testimonials.jsx";
import HamperData from "../data/HamperData.json";
import landingConfig from "../data/landingConfig.json"; 

function LandingPage() {
  const { hamperTabs, customHamperCta } = landingConfig;


  return (
    <>
      <TopBar />
      <HeroSection />
      <BottomStrip />
      <FeaturesSection />
      <Categories />
      <HotDealsSection />
      <HamperSection 
        tabs={hamperTabs} 
        hampers={HamperData} 
        customCta={customHamperCta}
      />
      <Testimonials />
      <CorporateBulkOrders />
      <SubscriptionPage />
      <FAQ />
      <Footer />
      
    </>
  );
}

export default LandingPage;