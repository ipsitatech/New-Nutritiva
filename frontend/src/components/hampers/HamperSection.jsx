// HamperSection.jsx
// Full "Luxury Gift Hampers" section.
// Composes HamperFilterTabs, HamperCard grid, and HamperCustomCTA.
//
// Props:
//   labelTag       – string       small pill above title       (e.g. "Premium Gifting")
//   sectionTitle   – string       main heading (plain text; wrap <em> in JSX if needed)
//   sectionSub     – string       subheading paragraph
//   tabs           – string[]     filter tab labels
//   hampers        – HamperItem[] array of hamper objects (see shape below)
//   customCta      – object       { title, description, waLink, buttonLabel? }
//
// HamperItem shape:
//   {
//     id:          string | number
//     imageSrc:    string
//     imageAlt:    string
//     tag:         string
//     name:        string
//     description: string
//     includes:    string[]
//     waLink:      string
//     featured?:   boolean
//     category:    string   // must match one of the tab labels (or "All Hampers")
//   }

import { useState } from "react";
import HamperFilterTabs from "./HamperFilterTabs";
import HamperCard from "./HamperCard";
import HamperCustomCTA from "./HamperCustomCTA";

export default function HamperSection({
  labelTag = "Premium Gifting",
  sectionTitle,
  sectionSub,
  tabs = [],
  hampers = [],
  customCta,
}) {
  const [activeTab, setActiveTab] = useState(tabs[0] ?? "All Hampers");
  const [showCount, setShowCount] = useState(3);

  // Filter hampers: if active tab is the first tab ("All …"), show all; else match by category
  const isAllTab = activeTab === tabs[0];
  const visible = isAllTab
    ? hampers
    : hampers.filter((h) => h.category === activeTab);

  // Reset show count when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowCount(3);
  };

  // Show only the first 'showCount' items
  const displayedHampers = visible.slice(0, showCount);
  const hasMore = visible.length > showCount;

  return (
    <section
      id="hampers"
      className="py-22 bg-[#F6F6F4]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-290 mx-auto px-6">
        {/* ── Section header ── */}
        <div className="text-center mb-11">
          <span className="inline-block text-[11px] font-bold tracking-[1px] uppercase text-[#2D7A4F] bg-[#EFF7F2] px-3.25 py-1.25 rounded-[20px] mb-3">
            {labelTag}
          </span>

          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-[#141414] leading-[1.15] mb-2.5 tracking-[-0.3px]">
            Luxury Gift Hampers
          </h2>

          <p className="text-[14px] text-[#787878] max-w-130 mx-auto leading-relaxed">
            Curated dry fruit hampers for weddings, festivals, corporate events
            & celebrations. Custom branding available.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        {tabs.length > 0 && (
          <HamperFilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}

        {/* ── Hamper grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 mb-9.5">
          {displayedHampers.map((hamper) => (
            <HamperCard
              key={hamper.id}
              imageSrc={hamper.imageSrc}
              imageAlt={hamper.imageAlt}
              tag={hamper.tag}
              name={hamper.name}
              description={hamper.description}
              includes={hamper.includes}
              waLink={hamper.waLink}
              featured={hamper.featured ?? false}
            />
          ))}
        </div>

        {/* ── Show More button ── */}
        {hasMore && (
          <div className="flex justify-center mb-9.5">
            <button
              onClick={() => setShowCount(showCount + 3)}
              className="px-7 py-3 bg-[#2D7A4F] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1F5238] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Show More
            </button>
          </div>
        )}

        {/* ── Custom CTA ── */}
        {customCta && (
          <HamperCustomCTA
            title={customCta.title}
            description={customCta.description}
            waLink={customCta.waLink}
            buttonLabel={customCta.buttonLabel}
          />
        )}
      </div>
    </section>
  );
}
