import HeroSection from "../components/HeroSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx"; 
import BottomStrip from "../components/BottomStrip.jsx";
import HotDealsSection from "../components/HotDealsSection.jsx";
import SubscriptionPage from "../components/SubscriptionPage.jsx";
import HamperSection from "../components/HamperSection.jsx";
import CorporateBulkOrders from "../components/CorporateBulkOrders.jsx";
import FAQ from "../components/FAQ.jsx";
import Categories from "../components/Categories.jsx";
import Testimonials from "../components/Testimonials.jsx";
import DiscountSlider from "../components/DiscountSlider.jsx";
import HamperData from "../data/HamperData.json";
import landingConfig from "../data/landingConfig.json"; 

function LandingPage() {
  const { hamperTabs, customHamperCta } = landingConfig;


  return (
    <>
      <HeroSection />
      <BottomStrip />
      <DiscountSlider />
      <FeaturesSection />
      <div id="categories">
        <Categories />
      </div>
      <div id="hot-deals">
        <HotDealsSection />
      </div>
      <HamperSection 
        tabs={hamperTabs} 
        hampers={HamperData} 
        customCta={customHamperCta}
      />
      <Testimonials />
      <div id="corporate">
        <CorporateBulkOrders />
      </div>
      <div id="subscription">
        <SubscriptionPage />
      </div>
      <div id="faq">
        <FAQ />
      </div>
    </>
  );
}

export default LandingPage;