import reviews from "../../data/testimonials.json";

const Testimonials = () => {
  return (
    <section
      className="py-20 bg-[#eff7f2] relative overflow-hidden"
      id="reviews"
    >
      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-[#2D7A4F] mb-3">
            VOICES OF NUTRITVA
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111] tracking-tight">
            What Our <span className="text-[#2D7A4F]">Customers</span> Say
          </h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden py-10 mask-gradient">
          <div className="flex animate-testimonial-marquee hover:[animation-play-state:paused] gap-6 whitespace-nowrap">
            {/* Double the reviews for seamless loop */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="inline-block w-[350px] bg-white rounded-[32px] p-8 transition-all duration-300 border border-[#2D7A4F]/5 shadow-[0_10px_40px_-15px_rgba(45,122,79,0.1)] whitespace-normal shrink-0"
              >
                <div className="text-[#D49E24] text-xl mb-4 tracking-[3px]">
                  ★★★★★
                </div>
                <p className="text-[14px] font-medium text-gray-800 leading-[1.8] italic mb-8 min-h-[100px]">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2D7A4F] text-white flex items-center justify-center text-[12px] font-black shrink-0 shadow-md">
                    {review.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900 leading-tight">
                      {review.name}
                    </span>
                    <span className="text-[11px] font-medium text-[#2D7A4F] opacity-70">
                      {review.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
