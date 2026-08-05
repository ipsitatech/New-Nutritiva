import hotDealsData from "../../data/hotDeals.json";
import almonds from "../../assets/product_imgs/almonds.png";
import walnuts from "../../assets/product_imgs/walnuts.png";
import pistachios from "../../assets/product_imgs/pistachios.png";
import WhatsAppIcon from "../ui/WhatsAppIcon";

import goji from "../../assets/product_imgs/goji_berries.png";

const IMAGE_MAP = {
  almonds,
  walnuts,
  pistachios,
  goji,
};

function HotDealCard({ product }) {
  const handleWhatsApp = () => {
    const phoneNumber = "917262866254";
    const message = `Hello, I want to enquire about ${product.name}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* ── Image ── */}
      <div className="relative">
        <img
          src={IMAGE_MAP[product.image]}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        {/* Red discount pill — top-left, matching image */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {product.discount}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="px-5 pt-5 pb-5 flex flex-col flex-grow">
        {/* Product name */}
        <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-1">
          {product.name}
        </h3>

        {/* Weight */}
        <p className="text-gray-400 text-sm font-normal mb-4">
          {product.weight}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[22px] font-black text-[#2D7A4F] leading-none">
            {product.price}
          </span>
          <span className="text-gray-400 line-through text-sm font-normal">
            {product.oldPrice}
          </span>
        </div>

        {/* WhatsApp CTA — pinned to bottom */}
        <button
          onClick={handleWhatsApp}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#2D7A4F] hover:bg-[#256340] active:bg-[#144025] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:shadow-md"
        >
          <WhatsAppIcon />
          Enquire Now
        </button>
      </div>
    </div>
  );
}

function HotDealsSection() {
  const products = hotDealsData;

  return (
    <section className="bg-[#f2f3f0] py-16">
      {/* ── Header ── */}
      <div className="text-center px-4 mb-12">
        {/* Label pill */}
        <span className="inline-flex items-center gap-1.5 bg-[#EFF7F2] text-[#2D7A4F] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
          🔥 Limited Time
        </span>

        {/* Title */}
        <h2 className="text-[40px] font-bold text-gray-900 mt-4 leading-tight tracking-tight">
          Hot <span className="text-[#2D7A4F]">Deals</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-base mt-3 max-w-xl mx-auto font-normal leading-relaxed">
          Handpicked bestsellers at special prices — prices shown in this
          section only.
        </p>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {products.map((product, index) => (
          <HotDealCard key={product.id ?? index} product={product} />
        ))}
      </div>
    </section>
  );
}

export default HotDealsSection;
