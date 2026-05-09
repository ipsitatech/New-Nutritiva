import hotDealsData from "../data/hotDeals.json";
import almonds from "../assets/product_imgs/almonds.png";
import walnuts from "../assets/product_imgs/walnuts.png";
import pistachios from "../assets/product_imgs/pistachios.png";
import goji from "../assets/product_imgs/goji_berries.png";

const IMAGE_MAP = {
  almonds,
  walnuts,
  pistachios,
  goji,
};

const WhatsAppIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
          Handpicked bestsellers at special prices — prices shown in this section only.
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