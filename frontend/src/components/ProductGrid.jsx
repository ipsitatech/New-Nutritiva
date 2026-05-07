import { motion } from 'framer-motion';

const ProductCard = ({ product, category, onBuy }) => {
    const handleEnquire = () => {
        const msg = encodeURIComponent(
            `Hi Nutritiva! I'd like to enquire about:\n\n` +
            `📦 Product: ${product.name}\n` +
            `📁 Category: ${category}\n\n` +
            `Could you please share the pricing, availability and packaging details? Thank you!`
        );
        window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    };

    return (
        <motion.div 
            className="bg-white rounded-nutri-lg overflow-hidden border border-border transition-all duration-300 flex flex-col group hover:-translate-y-2 hover:shadow-nutri-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative aspect-square overflow-hidden bg-bg">
                <img src={product.img} loading="lazy" alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-3 left-3 bg-nutri-green text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">Premium</div>
            </div>
            <div className="p-4 flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-1 text-[10px] font-bold text-nutri-green mb-1">
                    <span className="text-xs">⏱</span> Express Delivery
                </div>
                <h3 className="text-sm font-black text-dark leading-tight">{product.name}</h3>
                <div className="text-xs text-text-muted font-medium mb-3">{product.weight}</div>
                <div className="flex items-center gap-2 mt-auto">
                    <button className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-[#25D366] text-[#25D366] rounded-lg text-[11px] font-bold transition-all hover:bg-[#25D366] hover:text-white" onClick={handleEnquire}>
                        Enquire
                    </button>
                    <button 
                        className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-nutri-green text-white rounded-lg text-[11px] font-bold shadow-sm transition-all hover:bg-nutri-green-light hover:shadow-md"
                        onClick={() => onBuy({ ...product, category })}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ProductGrid = ({ categories, activeCategory, onBuy }) => {
    const filteredCategories = activeCategory === 'all' 
        ? categories 
        : categories.filter(cat => cat.name === activeCategory);

    return (
        <div className="space-y-16">
            {filteredCategories.map((cat, index) => (
                <section key={index} className="scroll-mt-24">
                    <h2 className="text-2xl font-black text-dark mb-8 flex items-center gap-3">
                        <span className="text-3xl">{cat.emoji}</span> {cat.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {cat.products.map((prod, pIndex) => (
                            <ProductCard 
                                key={pIndex} 
                                product={prod} 
                                category={cat.name} 
                                onBuy={onBuy}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ProductGrid;
