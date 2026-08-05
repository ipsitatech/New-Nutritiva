import bottomStripData from "../../data/bottomStrip.json";

function BottomStrip() {
  return (
    <div className="w-full bg-[#2D7A4F] text-white text-sm py-3 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex gap-10 px-4">
        {bottomStripData.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default BottomStrip;