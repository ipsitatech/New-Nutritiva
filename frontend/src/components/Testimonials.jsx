import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      initials: 'PS',
      name: 'Priya S.',
      location: 'Mumbai',
      text: "Ordered for my sister's wedding. The packaging was stunning and everyone loved the quality! Will definitely order again.",
    },
    {
      initials: 'RK',
      name: 'Rajesh K.',
      location: 'Delhi',
      text: "Perfect Diwali gift for clients. Custom branding made it extra special. Fresh products, beautiful presentation, timely delivery!",
    },
    {
      initials: 'AM',
      name: 'Anjali M.',
      location: 'Bangalore',
      text: "Fresh products, beautiful presentation, and timely delivery. The subscription box is a great value - gets better every month!",
    },
    {
      initials: 'TS',
      name: 'Tech Solutions Pvt Ltd',
      location: 'Hyderabad',
      text: "We've been ordering corporate Diwali gifts for 3 years now. Excellent quality and service. Highly recommended!",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#E2E6E4] relative overflow-hidden" id="reviews">
      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="block text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#1B3D28] mb-3">
            TESTIMONIALS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#111] tracking-tight">
            What Our <span className="text-[#1B3D28]">Customers</span> Say
          </h2>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[24px] p-6 flex flex-col transition-all duration-300 border border-black/5 shadow-sm"
            >
              <div className="text-[#D49E24] text-lg mb-4 tracking-[2px]">★★★★★</div>
              <p className="text-[13px] font-medium text-black leading-[1.7] italic flex-1 mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B3D28] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  {review.initials}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[12px] font-bold text-black leading-tight mb-[2px]">{review.name}</span>
                  <span className="text-[10px] font-medium text-black leading-tight">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
