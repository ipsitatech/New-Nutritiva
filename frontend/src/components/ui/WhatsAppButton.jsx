import WhatsAppIcon from "./WhatsAppIcon.jsx";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/917262866254";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-9999 w-14 h-14 bg-[#2D7A4F] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} color="white" />

      <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-[#141414] text-[13px] font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-[#EAEAEA]">
        Chat with us
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-[6px] border-transparent border-l-white" />
      </span>
    </a>
  );
}
