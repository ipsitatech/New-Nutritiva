import TopBar from "./components/TopBar";
import HamperSection from "./components/HamperSection";
import hamperData from "./HamperData.json";

function App() {
  // Extract unique categories from hamper data
  const categories = [
    "All Hampers",
    ...new Set(hamperData.map((h) => h.category)),
  ];

  const customCtaConfig = {
    title: "Need a Custom Hamper?",
    description:
      "Tell us your preferences and budget. We'll create the perfect gift hamper tailored just for you.",
    
    buttonLabel: "Get Custom Hamper",
  };

  return (
    <>
      <TopBar />
      <HamperSection
        hampers={hamperData}
        tabs={categories}
        customCta={customCtaConfig}
      />
    </>
  );
}

export default App;
