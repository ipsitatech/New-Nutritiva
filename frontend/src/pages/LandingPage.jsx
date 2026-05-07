import HeroSection from "../components/HeroSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx"; 
import Footer from "../components/Footer.jsx";
import TopBar from "../components/TopBar.jsx";
import BottomStrip from "../components/BottomStrip.jsx";
import HotDealsSection from "../components/HotDealsSection.jsx";
import SubscriptionPage from "../components/SubscriptionPage.jsx";
import HamperSection from "../components/HamperSection.jsx";
import HamperData from "../HamperData.json";


function LandingPage() {
  const hamperTabs = ["All Hampers", "Weddings", "Diwali", "Corporate", "Housewarming"];
  
  const customHamperCta = {
    title: "Need a Custom Selection?",
    description: "Work with our gifting experts to create a bespoke hamper tailored to your exact needs and budget.",
    waLink: "https://wa.me/919876543210?text=I%20want%20to%20discuss%20a%20custom%20hamper",
    buttonLabel: "Chat with Experts"
  };

  return (
    <>
      <TopBar />
      <HeroSection />
      <BottomStrip />
      <FeaturesSection />
      <HotDealsSection />
      <SubscriptionPage />
      <HamperSection 
        tabs={hamperTabs} 
        hampers={HamperData} 
        customCta={customHamperCta}
      />
      <Footer />
      
    </>
  );
}

export default LandingPage;