import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-[92px] bg-[#F6FAF7] relative overflow-hidden" id="reviews">
      {/* Top border strip */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-nutri-green via-nutri-green-light to-yellow"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-11">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-nutri-green bg-nutri-green-pale px-[13px] py-[5px] rounded-full mb-3">⭐ Testimonials</span>
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-[10px] tracking-tight">What Our <em className="not-italic text-nutri-green">Customers</em> Say</h2>
          <p className="text-sm text-text-muted max-w-[520px] mx-auto">Trusted by thousands of happy families and businesses across India.</p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-col md:flex-row items-stretch justify-center bg-white rounded-2xl border-[1.5px] border-border shadow-[0_2px_16px_rgba(0,0,0,0.05)] mb-[52px] overflow-hidden">
          <div className="p-[28px_40px] text-center bg-nutri-green flex flex-col justify-center min-w-[150px]">
            <div className="text-[52px] font-black text-white leading-none">4.9</div>
            <div className="text-yellow text-lg tracking-[2px] m-[6px_0_4px]">★★★★★</div>
            <div className="text-[11px] text-white/75 font-medium uppercase tracking-[0.5px]">Avg. Rating</div>
          </div>
          
          <div className="hidden md:block w-px bg-border self-stretch"></div>

          <div className="flex-1 text-center p-[24px_20px] flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
            <div className="text-[28px] font-black text-nutri-green leading-none">2,400+</div>
            <div className="text-xs text-text-muted mt-[5px] font-medium">Happy Customers</div>
          </div>
          <div className="flex-1 text-center p-[24px_20px] flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
            <div className="text-[28px] font-black text-nutri-green leading-none">98%</div>
            <div className="text-xs text-text-muted mt-[5px] font-medium">Repeat Orders</div>
          </div>
          <div className="flex-1 text-center p-[24px_20px] flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
            <div className="text-[28px] font-black text-nutri-green leading-none">500+</div>
            <div className="text-xs text-text-muted mt-[5px] font-medium">5-Star Reviews</div>
          </div>
          <div className="flex-1 text-center p-[24px_20px] flex flex-col justify-center border-border">
            <div className="text-[28px] font-black text-nutri-green leading-none">6+</div>
            <div className="text-xs text-text-muted mt-[5px] font-medium">Years Trusted</div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          <div className="bg-white rounded-[20px] p-[32px_30px_28px] border-[1.5px] border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-[0.28s] ease-out flex flex-col relative hover:border-nutri-green-mid hover:shadow-[0_8px_32px_rgba(45,122,79,0.1)] hover:-translate-y-1 group">
            <span className="text-[72px] leading-[0.8] text-nutri-green-mid font-serif absolute top-5 right-[26px] pointer-events-none select-none italic">&ldquo;</span>
            <div className="text-[#F6A609] text-base mb-[14px] tracking-[2px]">★★★★★</div>
            <p className="text-sm font-normal text-text leading-[1.85] mb-[22px] italic flex-1">"Ordered for my sister's wedding. The packaging was absolutely stunning and everyone loved the quality! Will definitely order again — the almonds were incredibly fresh."</p>
            <div className="flex items-center gap-[13px] pt-[18px] border-top-[1.5px] border-border">
              <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-nutri-green to-nutri-green-light flex items-center justify-center text-sm font-extrabold text-white shrink-0 shadow-[0_4px_14px_rgba(45,122,79,0.25)]">PS</div>
              <div>
                <span className="text-sm font-bold text-dark block">Priya S.</span>
                <span className="text-xs text-text-muted">📍 Mumbai</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-[32px_30px_28px] border-[1.5px] border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-[0.28s] ease-out flex flex-col relative hover:border-nutri-green-mid hover:shadow-[0_8px_32px_rgba(45,122,79,0.1)] hover:-translate-y-1 group">
            <span className="text-[72px] leading-[0.8] text-nutri-green-mid font-serif absolute top-5 right-[26px] pointer-events-none select-none italic">&ldquo;</span>
            <div className="text-[#F6A609] text-base mb-[14px] tracking-[2px]">★★★★★</div>
            <p className="text-sm font-normal text-text leading-[1.85] mb-[22px] italic flex-1">"Perfect Diwali gift for our clients. Custom branding made it extra special. Fresh products, beautiful presentation, and timely delivery — highly recommend for corporate gifting!"</p>
            <div className="flex items-center gap-[13px] pt-[18px] border-top-[1.5px] border-border">
              <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-nutri-green to-nutri-green-light flex items-center justify-center text-sm font-extrabold text-white shrink-0 shadow-[0_4px_14px_rgba(45,122,79,0.25)]">RK</div>
              <div>
                <span className="text-sm font-bold text-dark block">Rajesh K.</span>
                <span className="text-xs text-text-muted">📍 Delhi</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-[32px_30px_28px] border-[1.5px] border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-[0.28s] ease-out flex flex-col relative hover:border-nutri-green-mid hover:shadow-[0_8px_32px_rgba(45,122,79,0.1)] hover:-translate-y-1 group">
            <span className="text-[72px] leading-[0.8] text-nutri-green-mid font-serif absolute top-5 right-[26px] pointer-events-none select-none italic">&ldquo;</span>
            <div className="text-[#F6A609] text-base mb-[14px] tracking-[2px]">★★★★★</div>
            <p className="text-sm font-normal text-text leading-[1.85] mb-[22px] italic flex-1">"The subscription box gets better every single month! Love how they curate new products. Nutritiva is the only brand I trust completely for my family's daily nutrition needs."</p>
            <div className="flex items-center gap-[13px] pt-[18px] border-top-[1.5px] border-border">
              <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-nutri-green to-nutri-green-light flex items-center justify-center text-sm font-extrabold text-white shrink-0 shadow-[0_4px_14px_rgba(45,122,79,0.25)]">AM</div>
              <div>
                <span className="text-sm font-bold text-dark block">Anjali M.</span>
                <span className="text-xs text-text-muted">📍 Bangalore</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-[32px_30px_28px] border-[1.5px] border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-[0.28s] ease-out flex flex-col relative hover:border-nutri-green-mid hover:shadow-[0_8px_32px_rgba(45,122,79,0.1)] hover:-translate-y-1 group">
            <span className="text-[72px] leading-[0.8] text-nutri-green-mid font-serif absolute top-5 right-[26px] pointer-events-none select-none italic">&ldquo;</span>
            <div className="text-[#F6A609] text-base mb-[14px] tracking-[2px]">★★★★★</div>
            <p className="text-sm font-normal text-text leading-[1.85] mb-[22px] italic flex-1">"We've been ordering corporate Diwali gifts from Nutritiva for 3 years. Excellent quality every time, on-time delivery, and the team is incredibly responsive. Highly recommended!"</p>
            <div className="flex items-center gap-[13px] pt-[18px] border-top-[1.5px] border-border">
              <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-nutri-green to-nutri-green-light flex items-center justify-center text-sm font-extrabold text-white shrink-0 shadow-[0_4px_14px_rgba(45,122,79,0.25)]">TS</div>
              <div>
                <span className="text-sm font-bold text-dark block">Tech Solutions</span>
                <span className="text-xs text-text-muted">📍 Hyderabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
