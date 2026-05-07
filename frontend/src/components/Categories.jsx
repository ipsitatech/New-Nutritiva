import React from 'react';

const Categories = () => {
  return (
    <section className="py-24 bg-nutri-green-pale relative overflow-hidden" id="products">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_10%_30%,rgba(45,122,79,0.09)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_90%_70%,rgba(255,209,102,0.07)_0%,transparent_60%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-11" style={{ marginBottom: '40px' }}>
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-nutri-green bg-nutri-green-pale px-[13px] py-[5px] rounded-full mb-3">🛒 Browse</span>
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-[10px] tracking-tight">Shop by <em className="not-italic text-nutri-green">Category</em></h2>
          <p className="text-sm text-text-muted max-w-[520px] mx-auto">From premium nuts to superfoods — explore our handpicked collections.</p>
        </div>

        {/* Bento Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-none md:grid-rows-[220px,220px] gap-[14px] relative z-[1]">

          {/* Tile 1: Exotic Nuts — wide */}
          <div className="md:col-span-5 relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col justify-end group h-[220px] md:h-auto">
            <img src="imgs/cat_almonds.png" alt="Exotic Nuts" className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-109" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-nutri-green/70 group-hover:via-black/10 group-hover:to-transparent"></div>
            <div className="relative z-10 p-[18px_20px] translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-nutri-green-light/85 text-white px-[10px] py-[3px] rounded-full mb-2 backdrop-blur-[4px]">Bestseller</span>
              <span className="text-lg font-extrabold text-white leading-tight block">Exotic Nuts</span>
              <span className="text-xs text-white/65 mt-1 block opacity-0 translate-y-1.5 transition-all duration-300 delay-[0.05s] group-hover:opacity-100 group-hover:translate-y-0">Almonds · Cashews · Walnuts · Pecans</span>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white text-sm mt-2.5 opacity-0 scale-75 transition-all duration-[0.28s] ease-out backdrop-blur-[4px] border border-white/25 group-hover:opacity-100 group-hover:scale-100">→</div>
            </div>
          </div>

          {/* Tile 2: Gift Hampers — tall */}
          <div className="md:col-span-4 md:row-span-2 relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col justify-end group h-[220px] md:h-auto">
            <img src="imgs/cat_hampers.png" alt="Gift Hampers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-109" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-nutri-green/70 group-hover:via-black/10 group-hover:to-transparent"></div>
            <div className="relative z-10 p-[18px_20px] translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-nutri-green-light/85 text-white px-[10px] py-[3px] rounded-full mb-2 backdrop-blur-[4px]">Premium</span>
              <span className="text-lg font-extrabold text-white leading-tight block">Gift Hampers</span>
              <span className="text-xs text-white/65 mt-1 block opacity-0 translate-y-1.5 transition-all duration-300 delay-[0.05s] group-hover:opacity-100 group-hover:translate-y-0">Weddings · Diwali · Corporate</span>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white text-sm mt-2.5 opacity-0 scale-75 transition-all duration-[0.28s] ease-out backdrop-blur-[4px] border border-white/25 group-hover:opacity-100 group-hover:scale-100">→</div>
            </div>
          </div>

          {/* Tile 3: Berries — sm */}
          <div className="md:col-span-3 relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col justify-end group h-[220px] md:h-auto">
            <img src="imgs/cat_berries.png" alt="Berries" className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-109" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-nutri-green/70 group-hover:via-black/10 group-hover:to-transparent"></div>
            <div className="relative z-10 p-[18px_20px] translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-nutri-green-light/85 text-white px-[10px] py-[3px] rounded-full mb-2 backdrop-blur-[4px]">Superfood</span>
              <span className="text-lg font-extrabold text-white leading-tight block">Berries</span>
              <span className="text-xs text-white/65 mt-1 block opacity-0 translate-y-1.5 transition-all duration-300 delay-[0.05s] group-hover:opacity-100 group-hover:translate-y-0">Goji · Blueberry · Cranberry</span>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white text-sm mt-2.5 opacity-0 scale-75 transition-all duration-[0.28s] ease-out backdrop-blur-[4px] border border-white/25 group-hover:opacity-100 group-hover:scale-100">→</div>
            </div>
          </div>

          {/* Tile 4: Seeds — sm */}
          <div className="md:col-span-3 relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col justify-end group h-[220px] md:h-auto">
            <img src="imgs/cat_seeds.png" alt="Seeds" className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-109" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-nutri-green/70 group-hover:via-black/10 group-hover:to-transparent"></div>
            <div className="relative z-10 p-[18px_20px] translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-nutri-green-light/85 text-white px-[10px] py-[3px] rounded-full mb-2 backdrop-blur-[4px]">Healthy</span>
              <span className="text-lg font-extrabold text-white leading-tight block">Seeds</span>
              <span className="text-xs text-white/65 mt-1 block opacity-0 translate-y-1.5 transition-all duration-300 delay-[0.05s] group-hover:opacity-100 group-hover:translate-y-0">Chia · Pumpkin · Flax</span>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white text-sm mt-2.5 opacity-0 scale-75 transition-all duration-[0.28s] ease-out backdrop-blur-[4px] border border-white/25 group-hover:opacity-100 group-hover:scale-100">→</div>
            </div>
          </div>

          {/* Tile 5: Dry Fruits — med */}
          <div className="md:col-span-5 relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col justify-end group h-[220px] md:h-auto">
            <img src="imgs/cat_dryfruits.png" alt="Dry Fruits" className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-109" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-nutri-green/70 group-hover:via-black/10 group-hover:to-transparent"></div>
            <div className="relative z-10 p-[18px_20px] translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-nutri-green-light/85 text-white px-[10px] py-[3px] rounded-full mb-2 backdrop-blur-[4px]">Classic</span>
              <span className="text-lg font-extrabold text-white leading-tight block">Dry Fruits</span>
              <span className="text-xs text-white/65 mt-1 block opacity-0 translate-y-1.5 transition-all duration-300 delay-[0.05s] group-hover:opacity-100 group-hover:translate-y-0">Dates · Figs · Raisins</span>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white text-sm mt-2.5 opacity-0 scale-75 transition-all duration-[0.28s] ease-out backdrop-blur-[4px] border border-white/25 group-hover:opacity-100 group-hover:scale-100">→</div>
            </div>
          </div>

          {/* Tile 6: Subscription — std */}
          {/* Tile 7: View All */}
          <div className="md:col-span-4 grid grid-cols-2 gap-[14px]">
             {/* Box 1 */}
             <div className="relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col justify-end group h-[220px]">
                <img src="imgs/cat_subscription.png" alt="Subscription" className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-109" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-nutri-green/70 group-hover:via-black/10 group-hover:to-transparent"></div>
                <div className="relative z-10 p-[14px] translate-y-1.5 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-base font-extrabold text-white leading-tight block">Subscription</span>
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 text-white text-xs mt-1.5 opacity-0 scale-75 transition-all duration-[0.28s] ease-out backdrop-blur-[4px] border border-white/25 group-hover:opacity-100 group-hover:scale-100">→</div>
                </div>
             </div>
             {/* View All CTA */}
             <div className="relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center gap-2.5 bg-gradient-to-br from-nutri-green to-nutri-green-light group h-[220px]">
                <span className="text-3xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">📦</span>
                <strong className="text-lg font-extrabold text-white tracking-tight">View All</strong>
                <span className="text-[11px] font-medium text-white/80 -mt-1.5 uppercase tracking-widest">50+ Products</span>
                <div className="mt-1 px-4 py-1.5 rounded-full bg-white/15 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25 transition-all duration-300 group-hover:bg-white group-hover:text-nutri-green">Explore →</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;
