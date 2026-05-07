import React from 'react';

const Marquee = () => {
    return (
        <div className="bg-nutri-green py-3 overflow-hidden border-y border-white/10 relative z-20 shadow-lg">
            <div className="flex animate-marquee whitespace-nowrap gap-12 text-white/90 text-xs font-black uppercase tracking-[1.5px]">
                <span>🔒 Login to See Exclusive Pricing</span>
                <span>⭐ Premium Quality Guaranteed</span>
                <span>🚚 Pan India Delivery</span>
                <span>🎁 Gift Hampers Available</span>
                <span>🌿 100% Natural &amp; Fresh</span>
                
                {/* Duplicate for seamless loop */}
                <span>🔒 Login to See Exclusive Pricing</span>
                <span>⭐ Premium Quality Guaranteed</span>
                <span>🚚 Pan India Delivery</span>
                <span>🎁 Gift Hampers Available</span>
                <span>🌿 100% Natural &amp; Fresh</span>

                <span>🔒 Login to See Exclusive Pricing</span>
                <span>⭐ Premium Quality Guaranteed</span>
                <span>🚚 Pan India Delivery</span>
                <span>🎁 Gift Hampers Available</span>
                <span>🌿 100% Natural &amp; Fresh</span>
            </div>
        </div>
    );
};

export default Marquee;
