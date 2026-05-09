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

  return (
    <div className="bg-[#f8f9f7] min-h-screen flex items-center">

      <div
        className="
          max-w-7xl
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
        <div className="max-w-2xl text-center lg:text-left">

          {/* Badge */}
          <span
            className="
              bg-green-100
              text-green-700
              px-5
              py-2
              rounded-full
              text-sm
              font-medium
              inline-block
            "
          >
            🌿 100% Premium Quality
          </span>

          {/* Heading */}
          <h1
            className="
              text-5xl
              sm:text-6xl
              lg:text-[72px]
              font-bold
              leading-tight
              mt-6
              text-gray-900
            "
          >
            India's Most{" "}
            <span className="text-green-700">
              Trusted
            </span>
            <br />
            Dry Fruits &
            <br />
            Superfoods Brand
          </h1>

          {/* Paragraph */}
          <p
            className="
              text-gray-500
              mt-6
              text-lg
              leading-relaxed
              max-w-xl
              mx-auto
              lg:mx-0
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
              flex-col
              sm:flex-row
              gap-4
              mt-8
              justify-center
              lg:justify-start
            "
          >

            {/* SHOP NOW */}
            <button
              onClick={scrollToDeals}
              className="
                bg-green-700
                text-white
                px-8
                py-4
                rounded-xl
                text-lg
                hover:bg-green-800
                transition
              "
            >
              Shop Now
            </button>

            {/* VIEW SUBSCRIPTIONS */}
            <button
              onClick={() => navigate("/subscriptions")}
              className="
                border
                border-gray-300
                px-8
                py-4
                rounded-xl
                text-lg
                hover:bg-gray-100
                transition
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
            max-w-[500px]
            h-[280px]
            sm:h-[300px]
            lg:h-[350px]
            rounded-3xl
            overflow-hidden
            shadow-xl
          "
        >

          {/* SLIDER */}
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Dry Fruits"
                className="
                  w-full
                  max-w-[500px]
                  h-[220px]
                  sm:h-[300px]
                  lg:h-[350px]
                  object-cover
                  flex-shrink-0
                "
              />
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              bg-white/70
              backdrop-blur-md
              rounded-full
              p-2
              shadow
              hover:bg-white
            "
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              bg-white/70
              backdrop-blur-md
              rounded-full
              p-2
              shadow
              hover:bg-white
            "
          >
            ›
          </button>

        </div>

      </div>
    </div>
  );
}

export default HeroSection;