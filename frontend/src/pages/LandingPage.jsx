import HeroSection from "../components/hero/HeroSection.jsx";
import FeaturesSection from "../components/marketing/FeaturesSection.jsx";
import StatsDashboard from "../components/stats/StatsDashboard";
import BottomStrip from "../components/layout/BottomStrip.jsx";
import HotDealsSection from "../components/deals/HotDealsSection.jsx";
import SubscriptionPage from "../components/subscription/SubscriptionSection.jsx";
import HamperSection from "../components/hampers/HamperSection.jsx";
import CorporateBulkOrders from "../components/marketing/CorporateBulkOrders.jsx";
import FAQ from "../components/marketing/FAQ.jsx";
import Categories from "../components/categories/Categories.jsx";
import Testimonials from "../components/social-proof/Testimonials.jsx";
import DiscountSlider from "../components/marketing/DiscountSlider.jsx";
import HamperData from "../data/HamperData.json";
import landingConfig from "../data/landingConfig.json";

function LandingPage() {
  const { hamperTabs, customHamperCta } = landingConfig;

  return (
    <>
      <HeroSection />
      <BottomStrip />
      <DiscountSlider />
      <div id="stats">
        <StatsDashboard />
      </div>
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
