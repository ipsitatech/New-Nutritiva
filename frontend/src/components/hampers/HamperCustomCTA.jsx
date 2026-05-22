// HamperCustomCTA.jsx
// The dashed green call-to-action box shown below the hamper grid.
// Prompts users to request a custom / bulk hamper order.
//
// Props:
//   title       – string   heading text
//   description – string   body copy
//   waLink      – string   full WhatsApp URL for custom quote enquiry
//   buttonLabel – string   button text (default "Request Custom Quote")

import WhatsAppIcon from "../ui/WhatsAppIcon";

export default function HamperCustomCTA({
  title,
  description,
  waLink,
  buttonLabel = "Request Custom Quote",
}) {
  return (
    <div
      className="bg-[#EFF7F2] rounded-[10px] border-2 border-dashed border-[#2D7A4F]/20 px-10 py-8.5 text-center"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <h3 className="text-[20px] font-bold text-[#141414] mb-1.5">{title}</h3>
      <p className="text-[13px] text-[#787878] mb-5 max-w-105 mx-auto leading-relaxed">
        {description}
      </p>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-2.75 bg-[#2D7A4F] hover:bg-[#1e5235] hover:shadow-[0_6px_20px_rgba(45,122,79,0.25)] text-white text-[14px] font-semibold rounded-lg border-2 border-[#2D7A4F] hover:border-[#1e5235] transition-all duration-200"
      >
        <WhatsAppIcon size={16} />
        {buttonLabel}
      </a>
    </div>
  );
}
