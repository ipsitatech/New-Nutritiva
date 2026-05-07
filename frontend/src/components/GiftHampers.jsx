import React from 'react';

const GiftHampers = ({ onBuy }) => {
    return (
        <section className="py-24 bg-bg" id="hampers">
            <div className="container mx-auto px-6">
                <div className="text-center mb-11">
                    <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-nutri-green bg-nutri-green-pale px-[13px] py-[5px] rounded-full mb-3">Premium Gifting</span>
                    <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-[10px] tracking-tight">Luxury Gift <em className="not-italic text-nutri-green">Hampers</em></h2>
                    <p className="text-sm text-text-muted max-w-[520px] mx-auto">Curated dry fruit hampers for weddings, festivals, corporate events &amp; celebrations. Custom branding available.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2.5 mb-11">
                    {["All Hampers", "Weddings", "Diwali", "Corporate", "Housewarming"].map((tab, idx) => (
                        <button key={idx} className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${idx === 0 ? 'bg-nutri-green text-white shadow-md' : 'bg-white text-text-muted border border-border hover:border-nutri-green hover:text-nutri-green'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {/* Hamper 1 */}
                    <div className="bg-white rounded-nutri-lg overflow-hidden shadow-nutri border border-border flex flex-col group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img src="imgs/dryfruit bowl.png" alt="Premium Delight" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <span className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Weddings &amp; Celebrations</span>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <p className="text-lg font-extrabold text-dark mb-1">Premium Delight Hamper</p>
                            <p className="text-xs text-text-muted mb-4">Luxury assortment perfect for special occasions</p>
                            <ul className="space-y-2 mb-6">
                                {["500g Premium Almonds", "500g Cashews", "250g Dates", "500g Pistachios", "+ 2 more items"].map((item, i) => (
                                    <li key={i} className="text-[13px] text-text flex items-center gap-2">
                                        <span className="text-nutri-green">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                className="mt-auto inline-flex items-center justify-center gap-2 w-full p-3 bg-nutri-green text-white rounded-lg text-sm font-bold transition-all hover:bg-nutri-green-light hover:shadow-lg"
                                onClick={() => onBuy({ name: "Premium Delight Hamper", weight: "2.5kg Box", img: "imgs/dryfruit bowl.png", category: "Gift Hampers" })}
                            >
                                <span className="text-lg">🛒</span> Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Hamper 2 (Featured) */}
                    <div className="bg-white rounded-nutri-lg overflow-hidden shadow-nutri-md border-2 border-nutri-green flex flex-col scale-105 z-10 relative group">
                        <div className="absolute top-4 right-4 bg-nutri-green text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-20">Best Value</div>
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img src="imgs/almonds.png" alt="Festive Joy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <span className="absolute bottom-4 left-4 bg-nutri-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Diwali &amp; Festivals</span>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <p className="text-lg font-extrabold text-dark mb-1">Festive Joy Collection</p>
                            <p className="text-xs text-text-muted mb-4">Traditional selection for Diwali and festivals</p>
                            <ul className="space-y-2 mb-6">
                                {["500g Mixed Dry Fruits", "500g Dates", "250g Raisins", "+ 2 more items"].map((item, i) => (
                                    <li key={i} className="text-[13px] text-text flex items-center gap-2">
                                        <span className="text-nutri-green">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                className="mt-auto inline-flex items-center justify-center gap-2 w-full p-3 bg-nutri-green text-white rounded-lg text-sm font-bold transition-all hover:bg-nutri-green-light hover:shadow-lg"
                                onClick={() => onBuy({ name: "Festive Joy Collection", weight: "1.5kg Box", img: "imgs/almonds.png", category: "Gift Hampers" })}
                            >
                                <span className="text-lg">🛒</span> Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Hamper 3 */}
                    <div className="bg-white rounded-nutri-lg overflow-hidden shadow-nutri border border-border flex flex-col group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img src="imgs/goji_berries.png" alt="Wellness Box" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <span className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Get Well Soon</span>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <p className="text-lg font-extrabold text-dark mb-1">Wellness &amp; Health Box</p>
                            <p className="text-xs text-text-muted mb-4">Superfood collection for health conscious gifting</p>
                            <ul className="space-y-2 mb-6">
                                {["750g Goji Berries", "500g Chia Seeds", "500g Pumpkin Seeds", "+ 2 more items"].map((item, i) => (
                                    <li key={i} className="text-[13px] text-text flex items-center gap-2">
                                        <span className="text-nutri-green">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                className="mt-auto inline-flex items-center justify-center gap-2 w-full p-3 bg-nutri-green text-white rounded-lg text-sm font-bold transition-all hover:bg-nutri-green-light hover:shadow-lg"
                                onClick={() => onBuy({ name: "Wellness & Health Box", weight: "2kg Box", img: "imgs/goji_berries.png", category: "Gift Hampers" })}
                            >
                                <span className="text-lg">🛒</span> Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 p-8 md:p-10 bg-white border-2 border-dashed border-nutri-green/30 rounded-nutri-lg flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="max-w-[600px]">
                        <h3 className="text-xl md:text-2xl font-black text-dark mb-2">Need a Custom Hamper?</h3>
                        <p className="text-sm text-text-muted leading-relaxed">Create a personalized gift hamper with your choice of products, custom packaging, and branding. Perfect for bulk corporate orders and special events.</p>
                    </div>
                    <a href="https://wa.me/919876543210?text=I need a custom hamper quote" className="inline-flex items-center gap-2 px-8 py-4 bg-nutri-green text-white rounded-lg text-sm font-bold shadow-nutri hover:bg-nutri-green-light hover:shadow-nutri-md transition-all shrink-0" target="_blank" rel="noreferrer">Request Custom Quote</a>
                </div>
            </div>
        </section>
    );
};

export default GiftHampers;
