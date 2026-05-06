import { useState, useEffect } from "react";

import almonds from "../assets/product_imgs/almonds.png";
import berries from "../assets/product_imgs/mixed_berries.png";
import cashews from "../assets/product_imgs/cashews_bowl.png";
import walnuts from "../assets/product_imgs/walnuts.png";

function HeroSection() {
  const images = [almonds, berries, cashews, walnuts];
  const [current, setCurrent] = useState(0);

  // 🔁 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[#f8f9f7] h-[93vh] flex items-center px-10">
      <div className="flex w-full justify-between items-center gap-16">

        {/* LEFT TEXT */}
        <div className="max-w-2xl">

          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
            🌿 100% Premium Quality
          </span>

          <h1 className="text-[64px] font-bold leading-tight mt-6 text-gray-900">
            India's Most{" "}
            <span className="text-green-700">Trusted</span> <br />
            Dry Fruits & <br />
            Superfoods Brand
          </h1>

          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            Premium grade products with transparent sourcing,
            temperature-controlled packaging, and nationwide delivery.
            Nourishing families across India.
          </p>

          <div className="flex gap-5 mt-8">
            <button className="bg-green-700 text-white px-8 py-4 rounded-xl text-lg hover:bg-green-800 transition">
              Shop Now
            </button>

            <button className="border px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition">
              View Subscriptions
            </button>
          </div>
        </div>

        {/* RIGHT BIG SLIDER */}
        <div className="relative w-[620px] h-[420px] rounded-3xl overflow-hidden shadow-xl">

          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-[620px] h-[420px] object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md rounded-full p-2 shadow"
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md rounded-full p-2 shadow"
          >
            ›
          </button>

        </div>

      </div>
    </div>
  );
}

export default HeroSection;