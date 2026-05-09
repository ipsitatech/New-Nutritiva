import React, { useState, useEffect } from "react";

import almonds from "../assets/product_imgs/almonds.png";
import berries from "../assets/product_imgs/mixed_berries.png";
import cashews from "../assets/product_imgs/cashews_bowl.png";
import walnuts from "../assets/product_imgs/walnuts.png";

import heroData from "../data/hero.json";

function HeroSection() {
  const images = [almonds, berries, cashews, walnuts];
  const [current, setCurrent] = useState(0);
  const { badge, headingMain, headingHighlight, headingSub, description, primaryBtn, secondaryBtn } = heroData;

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[#f8f9f7] min-h-screen flex items-center">

      <div className="
        max-w-7xl 
        mx-auto 
        w-full 
        px-6 
        lg:px-12
        flex 
        flex-col 
        lg:flex-row 
        items-center 
        justify-between 
        gap-12
      ">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl text-center lg:text-left">

          {/* Badge */}
          <span className="
            bg-[#EFF7F2] 
            text-[#2D7A4F] 
            px-5 
            py-2 
            rounded-full 
            text-sm 
            font-medium
            inline-block
          ">
            {badge}
          </span>

          {/* Heading */}
          <h1 className="
            text-5xl
            sm:text-6xl
            lg:text-[62px]
            font-bold 
            leading-tight 
            mt-6 
            text-gray-900
          ">
            {headingMain}{" "}
            <span className="text-[#2D7A4F]">
              {headingHighlight}
            </span>
            <br />
            {headingSub.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>

          {/* Paragraph */}
          <p className="
            text-gray-500 
            mt-6 
            text-lg 
            leading-relaxed
            max-w-xl
            mx-auto
            lg:mx-0
          ">
            {description}
          </p>

          {/* Buttons */}
          <div className="
            flex 
            flex-col 
            sm:flex-row 
            gap-4 
            mt-8
            justify-center
            lg:justify-start
          ">

            <button className="
              bg-[#2D7A4F] 
              text-white 
              px-8 
              py-4 
              rounded-xl 
              text-lg 
              hover:bg-[#1e5235] 
              transition
            ">
              {primaryBtn}
            </button>

            <button className="
              border 
              border-gray-300
              px-8 
              py-4 
              rounded-xl 
              text-lg 
              hover:bg-gray-100 
              transition
            ">
              {secondaryBtn}
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="
          relative 
          w-full
          max-w-[520px]
          h-[260px]
          sm:h-[350px]
          lg:h-[420px]
          rounded-3xl 
          overflow-hidden 
          shadow-xl
        ">

          {/* Slider */}
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
                  max-w-[620px]
                  h-[260px]
                  sm:h-[350px]
                  lg:h-[420px]
                  object-cover
                  flex-shrink-0
                "
              />
            ))}
          </div>

          {/* Left Arrow */}
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

          {/* Right Arrow */}
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