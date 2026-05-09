// HamperCard.jsx
// Individual gift hamper product card.
//
// Props:
//   imageSrc    – string            path/URL to card image
//   imageAlt    – string            alt text for image
//   tag         – string            small overlay label on image (e.g. "Weddings & Celebrations")
//   name        – string            hamper title
//   description – string            one-line subtitle
//   includes    – string[]          list of items in the hamper
//   waLink      – string            full WhatsApp enquiry URL
//   featured    – boolean           if true, applies green border highlight (default false)

import WhatsAppIcon from "./WhatsAppIcon";

export default function HamperCard({
  imageSrc,
  imageAlt,
  tag,
  name,
  description,
  includes = [],
  waLink,
  featured = false,
}) {
  return (
    <div
      className={[
        "bg-white rounded-2xl border-[1.5px] overflow-hidden flex flex-col transition-all duration-200",
        "hover:border-[#C8E6D4] hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]",
        featured ? "border-[#2D7A4F]" : "border-[#EAEAEA]",
      ].join(" ")}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Image ── */}
      <div className="h-49 relative overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {tag && (
          <span className="absolute top-2.75 left-2.75 bg-[rgba(45,122,79,0.88)] text-white text-[10px] font-bold px-2.5 py-0.75 rounded-[20px]">
            {tag}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 px-4.5 pt-4.5 pb-5">
        {/* Name */}
        <p className="text-[15px] font-bold text-[#141414] mb-1 leading-snug">
          {name}
        </p>

        {/* Description */}
        <p className="text-[12px] text-[#787878] mb-2.75 leading-normal">
          {description}
        </p>

        {/* Includes list — pushes button to bottom */}
        <ul className="flex flex-col gap-1 mb-auto pb-4">
          {includes.map((item, i) => (
            <li
              key={i}
              className="text-[12px] text-[#383838] font-normal pl-3.25 relative before:content-['•'] before:absolute before:left-0 before:text-[#2D7A4F] before:font-black"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.75 w-full px-4 py-2.5 bg-[#2D7A4F] hover:bg-[#1e5235] hover:shadow-[0_4px_16px_rgba(45,122,79,0.35)] text-white text-[13px] font-semibold rounded-lg transition-all duration-200"
        >
          <WhatsAppIcon size={14} />
          Enquire Now
        </a>
      </div>
    </div>
  );
}
