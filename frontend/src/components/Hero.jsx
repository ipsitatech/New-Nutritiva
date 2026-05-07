import React, { useState, useEffect } from 'react';

const Hero = () => {
    const slides = [
        "imgs/almonds.png",
        "imgs/walnuts.png",
        "imgs/mixed_berries.png",
        "imgs/pistachios.png"
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="min-h-[92vh] bg-gradient-to-br from-[#EFF7F2] via-[#F8FBF9] to-[#FFF8F0] flex items-center p-[100px_24px_60px] relative overflow-hidden" id="hero">
            <div className="max-w-[1160px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-14">
                <div>
                    <span className="inline-flex items-center gap-1.5 bg-nutri-green text-white text-[11px] font-bold p-[5px_14px] rounded-full mb-4.5 tracking-[0.5px]">🌱 100% Premium Quality</span>
                    <h1 className="text-[clamp(30px,4.2vw,52px)] font-extrabold leading-[1.1] text-dark mb-4 tracking-[-0.8px]">
                        India's Most <em className="not-italic text-nutri-green">Trusted</em><br />Dry Fruits &amp;<br />Superfoods Brand
                    </h1>
                    <p className="text-[15px] text-text-muted max-w-[410px] mb-7 leading-[1.7] font-normal">
                        Premium grade products with transparent sourcing, temperature-controlled packaging,
                        and nationwide delivery. Nourishing families across India.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <a href="#products" className="inline-flex items-center gap-2 p-[11px_24px] bg-nutri-green text-white rounded-lg text-sm font-semibold border-2 border-nutri-green transition-all hover:bg-nutri-green-light hover:border-nutri-green-light hover:shadow-[0_6px_20px_rgba(45,122,79,0.25)]">Shop Now</a>
                        <a href="#subscriptions" className="inline-flex items-center gap-2 p-[11px_24px] bg-transparent text-dark rounded-lg text-sm font-semibold border-2 border-border transition-all hover:border-nutri-green hover:text-nutri-green hover:bg-nutri-green-pale">View Subscriptions</a>
                    </div>
                </div>
                <div className="relative rounded-nutri-lg overflow-hidden h-[390px] shadow-nutri-md">
                    <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((src, index) => (
                            <div className="min-w-full h-full shrink-0" key={index}>
                                <img src={src} alt="Hero Slide" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-3 pointer-events-none">
                        <button className="w-[34px] h-[34px] rounded-full bg-white/85 flex items-center justify-center cursor-pointer pointer-events-auto border-none transition-all shadow-nutri-sm hover:bg-white hover:shadow-nutri" onClick={prevSlide}>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="w-[34px] h-[34px] rounded-full bg-white/85 flex items-center justify-center cursor-pointer pointer-events-auto border-none transition-all shadow-nutri-sm hover:bg-white hover:shadow-nutri" onClick={nextSlide}>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-[7px]">
                        {slides.map((_, index) => (
                            <button 
                                key={index} 
                                className={`w-[7px] h-[7px] rounded-full cursor-pointer transition-all p-0 border-none ${currentSlide === index ? 'bg-white scale-[1.3]' : 'bg-white/50'}`}
                                onClick={() => setCurrentSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
