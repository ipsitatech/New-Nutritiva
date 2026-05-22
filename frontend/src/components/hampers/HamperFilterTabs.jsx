// HamperFilterTabs.jsx
// Props:
//   tabs        – string[]           list of tab labels
//   activeTab   – string             currently selected tab label
//   onTabChange – (tab: string) => void

export default function HamperFilterTabs({
  tabs = [],
  activeTab,
  onTabChange,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8.5">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={[
              "px-4.5 py-1.75 rounded-[20px] text-[13px] font-medium border-[1.5px] transition-all duration-200 whitespace-nowrap",
              isActive
                ? "bg-[#2D7A4F] text-white border-[#2D7A4F]"
                : "bg-white text-[#787878] border-[#EAEAEA] hover:bg-[#2D7A4F] hover:text-white hover:border-[#2D7A4F]",
            ].join(" ")}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
