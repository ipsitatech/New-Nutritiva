import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import almonds from "../assets/product_imgs/almonds.png";
import berries from "../assets/product_imgs/mixed_berries.png";
import cashews from "../assets/product_imgs/cashews_bowl.png";
import walnuts from "../assets/product_imgs/walnuts.png";

function HeroSection() {
  const navigate = useNavigate();

  const images = [almonds, berries, cashews, walnuts];

  const [current, setCurrent] = useState(0);

  // 🔁 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ➡ Next Slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // ⬅ Previous Slide
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // 🔥 Scroll to Hot Deals Section
  const scrollToDeals = () => {
    const section = document.getElementById("hot-deals");

    section?.scrollIntoView({
      behavior: "smooth",
    });
  };
const scrollToSubscription=()=>{
const section = document.getElementById("subscription");

    section?.scrollIntoView({
      behavior: "smooth",
    });
}
  return (
    <div className="bg-[#f8f9f7] min-h-screen flex items-center">

      <div
        className="
          max-w-10xl
          mx-auto
          w-full
          px-6
          lg:px-12
          flex
          flex-col
          lg:flex-row
          items-center
          justify-center
          gap-8
        "
      >

        {/* LEFT CONTENT */}
        <div className="max-w-[620px] text-center lg:text-left">

          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-1.5
              bg-[#2D7A4F]
              text-white
              px-3
              py-1
              rounded-lg
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              mb-6
            "
          >
            <span>🌱</span>
            <span>100% Premium Quality</span>
          </div>

          {/* Heading */}
          <h1
            className="
              text-5xl
              sm:text-6xl
              lg:text-[64px]
              font-black
              leading-[1.1]
              text-[#141414]
              tracking-[-0.04em]
            "
          >
            India's Most{" "}
            <span className="text-[#2D7A4F]">
              Trusted
            </span>
            <br />
            Dry Fruits &<br />
            Superfoods Brand
          </h1>

          {/* Paragraph */}
          <p
            className="
              text-[#666]
              mt-6
              text-[16px]
              leading-relaxed
              max-w-md
              mx-auto
              lg:mx-0
              font-medium
            "
          >
            Premium grade products with transparent sourcing,
            temperature-controlled packaging, and nationwide delivery.
            Nourishing families across India.
          </p>

          {/* Buttons */}
          <div
            className="
              flex
              items-center
              gap-4
              mt-10
              justify-center
              lg:justify-start
            "
          >

            {/* SHOP NOW */}
            <button
              onClick={scrollToDeals}
              className="
                bg-[#2D7A4F]
                text-white
                px-8
                py-3
                rounded-xl
                text-[15px]
                font-black
                hover:bg-[#236340]
                transition-all
                shadow-sm
              "
            >
              Shop Now
            </button>

            {/* VIEW SUBSCRIPTIONS */}
            <button
              onClick={scrollToSubscription}
              className="
                bg-white/50
                backdrop-blur-sm
                border
                border-[#E5E5E5]
                text-[#141414]
                px-9
                py-4
                rounded-xl
                text-[15px]
                font-black
                hover:bg-white
                transition-all
              "
            >
              View Subscriptions
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div
          className="
            relative
            w-full
            max-w-[540px]
            h-[300px]
            sm:h-[360px]
            lg:h-[400px]
            rounded-[32px]
            overflow-hidden
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
            group
          "
        >

          {/* SLIDER */}
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {images.map((img, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img
                  src={img}
                  alt="Dry Fruits"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* NAVIGATION OVERLAY */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            {/* LEFT ARROW */}
            <button
              onClick={prevSlide}
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                bg-white/80
                backdrop-blur-md
                rounded-full
                shadow-sm
                hover:bg-white
                transition-all
                pointer-events-auto
                opacity-0
                group-hover:opacity-100
              "
            >
              <span className="text-[14px] font-bold text-[#141414]">‹</span>
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextSlide}
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                bg-white/80
                backdrop-blur-md
                rounded-full
                shadow-sm
                hover:bg-white
                transition-all
                pointer-events-auto
                opacity-0
                group-hover:opacity-100
              "
            >
              <span className="text-[14px] font-bold text-[#141414]">›</span>
            </button>
          </div>

          {/* DOTS INDICATOR */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  w-2
                  h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${current === index ? "bg-white w-4" : "bg-white/50"}
                `}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default HeroSection;