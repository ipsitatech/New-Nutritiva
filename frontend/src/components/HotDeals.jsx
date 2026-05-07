import React from 'react';

const HotDeals = ({ onBuy }) => {
    return (
        <section className="py-20 bg-white" id="hotdeals">
            <div className="container mx-auto px-6">
                <div className="text-center mb-11">
                    <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-nutri-green bg-nutri-green-pale px-[13px] py-[5px] rounded-full mb-3">🔥 Limited Time</span>
                    <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-[10px] tracking-tight">Hot <em className="not-italic text-nutri-green">Deals</em></h2>
                    <p className="text-sm text-text-muted max-w-[520px] mx-auto">Handpicked bestsellers at special prices — prices shown in this section only.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { name: "Premium California Almonds", weight: "500g", price: "₹899", original: "₹1,199", off: "25% OFF", img: "imgs/almonds.png" },
                        { name: "Kashmiri Walnut Kernels", weight: "500g", price: "₹1,299", original: "₹1,599", off: "19% OFF", img: "imgs/walnuts.png" },
                        { name: "Premium Iranian Pistachios", weight: "500g", price: "₹1,499", original: "₹1,899", off: "21% OFF", img: "imgs/pistachios.png" },
                        { name: "Organic Goji Berries", weight: "250g", price: "₹799", original: "₹999", off: "20% OFF", img: "imgs/goji_berries.png" }
                    ].map((deal, idx) => (
                        <div key={idx} className="bg-white rounded-nutri-lg overflow-hidden shadow-nutri-md relative border border-border transition-all duration-300 ease-out flex flex-col hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.13)] group">
                            <div className="relative aspect-square overflow-hidden bg-bg">
                                <img src={deal.img} alt={deal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <span className="absolute top-3.5 left-3.5 bg-[#e74c3c] text-white text-xs font-black p-[5px_14px] rounded-full tracking-wider shadow-lg z-10">{deal.off}</span>
                            </div>
                            <div className="p-[16px_18px_20px] flex flex-col gap-2 flex-1">
                                <p className="text-sm font-extrabold text-dark leading-tight">{deal.name}</p>
                                <p className="text-xs text-text-muted">{deal.weight}</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-black text-nutri-green">{deal.price}</span>
                                    <span className="text-xs text-text-light line-through">{deal.original}</span>
                                </div>
                                <button 
                                    className="mt-auto inline-flex items-center justify-center gap-2 p-[10px_16px] bg-nutri-green text-white rounded-lg text-xs font-bold transition-all hover:bg-nutri-green-light hover:shadow-[0_4px_16px_rgba(45,122,79,0.35)]" 
                                    onClick={() => onBuy({ ...deal, category: 'Hot Deals' })}
                                >
                                    <span className="text-sm">🛒</span> Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HotDeals;
