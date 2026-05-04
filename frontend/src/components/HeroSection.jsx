import { useState, useEffect } from "react";

import almonds from "../assets/product_imgs/almonds.png";
import berries from "../assets/product_imgs/mixed_berries.png";
import cashews from "../assets/product_imgs/cashews_bowl.png";
import walnuts from "../assets/product_imgs/walnuts.png";

function HeroSection() {
  const images = [almonds, berries, cashews, walnuts];

  const [current, setCurrent] = useState(0);

  // 🔁 Auto slide every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ➡ Next
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // ⬅ Prev
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[#f8f9f7] flex items-center px-24 py-20">
      <div className="flex w-full justify-between items-center">

        {/* LEFT SIDE */}
        <div className="max-w-xl">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
            🌿 100% Premium Quality
          </span>

          <h1 className="text-5xl font-bold mt-5 leading-tight">
            India's Most <span className="text-green-700">Trusted</span> <br />
            Dry Fruits & <br />
            Superfoods Brand
          </h1>

          <p className="text-gray-600 mt-4">
            Premium grade products with transparent sourcing,
            temperature-controlled packaging, and nationwide delivery.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
              Shop Now
            </button>

            <button className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              View Subscriptions
            </button>
          </div>
        </div>

        {/* RIGHT SIDE SLIDER */}
<div className="relative flex items-center">

  {/* IMAGE 1 */}
  <div className="w-80 h-120 rounded-2xl overflow-hidden shadow-lg">
    <img
      src={images[current]}
      className="w-full h-full object-cover hover:scale-105 transition duration-300"
    />
  </div>

  {/* IMAGE 2 */}
  <div className="w-80 h-120 rounded-2xl overflow-hidden shadow-lg -ml-8">
    <img
      src={images[(current + 1) % images.length]}
      className="w-full h-full object-cover hover:scale-105 transition duration-300"
    />
  </div>

  {/* LEFT ARROW */}
  <button
    onClick={prevSlide}
    className="absolute left-[-30px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-2xl"
  >
    &lt;
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={nextSlide}
    className="absolute right-[-30px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-2xl"
  >
    &gt;
  </button>

</div>

      </div>
    </div>
  );
}

export default HeroSection;