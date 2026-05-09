import categoriesData from "../data/categories.json";
import cat_almonds from "../assets/product_imgs/almonds.png";
import cat_dryfruits from "../assets/product_imgs/mixed_dryfruit.png";
import cat_berries from "../assets/product_imgs/mixed_berries.png";
import cat_seeds from "../assets/product_imgs/pumpkin_seeds.png";
import cat_hampers from "../assets/product_imgs/dryfruits_falling.png";
import cat_bulk from "../assets/product_imgs/dryfruit bowl.png";
import cat_pistachios from "../assets/product_imgs/pistachios.png";
import cat_organic from "../assets/product_imgs/goji_berries.png";

const IMAGE_MAP = {
  "almonds": cat_almonds,
  "mixed_dryfruit": cat_dryfruits,
  "mixed_berries": cat_berries,
  "pumpkin_seeds": cat_seeds,
  "dryfruits_falling": cat_hampers,
  "dryfruit bowl": cat_bulk,
  "almonds_box": cat_almonds, // Assuming some shared images
  "goji_berries": cat_organic,
  "pistachios": cat_pistachios
};

const Categories = () => {
  const categories = categoriesData;

  return (
    <section className="py-16 md:py-24 bg-nutri-green-pale relative overflow-hidden" id="products">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_10%_30%,rgba(45,122,79,0.09)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_90%_70%,rgba(255,209,102,0.07)_0%,transparent_60%)]"></div>

      <div className="container mx-auto max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-11 px-6 md:px-10">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-nutri-green bg-nutri-green-pale px-[13px] py-[5px] rounded-full mb-3 border border-nutri-green/10">🛒 Browse</span>
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-[10px] tracking-tight">Shop by <em className="not-italic text-nutri-green">Category</em></h2>
          <p className="text-sm text-text-muted max-w-[520px] mx-auto">From premium nuts to superfoods — explore our handpicked collections.</p>
        </div>

        {/* Carousel / Flex container */}
        <div className="flex overflow-x-auto gap-4 sm:gap-5 md:gap-6 pb-6 px-6 md:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center shrink-0 group cursor-pointer w-[80px] sm:w-[100px] md:w-[110px] lg:w-[120px]">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] rounded-[18px] sm:rounded-[24px] overflow-hidden mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
                <img src={IMAGE_MAP[cat.img] || cat.img} alt={cat.name.replace('\n', ' ')} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-[#222] text-center leading-tight whitespace-pre-line">
                {cat.name}
              </span>
            </div>
          ))}

          {/* View All Tile */}
          <div className="flex flex-col items-center shrink-0 group cursor-pointer w-[80px] sm:w-[100px] md:w-[110px] lg:w-[120px]">
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] rounded-[18px] sm:rounded-[24px] bg-[#9CA69E] border border-[#8B968D] flex flex-col items-center justify-center mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-xl sm:text-2xl lg:text-3xl mb-1 drop-shadow-md transition-transform duration-300 group-hover:scale-110">📦</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-[#1A3D28] tracking-wide">All Products</span>
            </div>
            <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-[#1A3D28]">
              View All
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;

