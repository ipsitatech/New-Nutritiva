import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';
import bowlImg from "../assets/product_imgs/dryfruit bowl.png";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen text-[#333] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* 1. Header: Clean & Muted */}
        <header className="mb-16 border-b border-gray-100 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-4 tracking-tight">
            Our Story
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            A simple mission to bring pure, authentic nutrition from nature directly to your home.
          </p>
        </header>

        {/* 2. Image: Full Width & Simple */}
        <div className="mb-20 rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={bowlImg} 
            alt="Nutritva sourcing" 
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* 3. Text Content: Focus on Readability */}
        <article className="space-y-12">
          <section>
            <h2 className="text-xl font-bold text-[#141414] mb-4">Rooted in Quality</h2>
            <p className="text-gray-600 leading-relaxed">
              Nutritva was founded on the principle that premium nutrition should be accessible and transparent. 
              We personally source every nut, berry, and seed from producers who prioritize quality over quantity. 
              From the orchards of Kashmir to the farms of the South, our process ensures that what reaches you is 
              exactly as nature intended—pure, raw, and full of life.
            </p>
          </section>

          {/* 4. Values: Minimalist List */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#2D7A4F]">
                <Leaf size={18} />
                <span className="font-bold text-sm uppercase tracking-wider">Natural</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                100% naturally sourced products with no artificial additives or preservatives.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#2D7A4F]">
                <ShieldCheck size={18} />
                <span className="font-bold text-sm uppercase tracking-wider">Quality</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Each batch undergoes rigorous testing to ensure it meets our premium standards.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#2D7A4F]">
                <Heart size={18} />
                <span className="font-bold text-sm uppercase tracking-wider">Health</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Dedicated to improving the well-being of every family we serve across India.
              </p>
            </div>
          </section>

          <section className="pt-12 border-t border-gray-100">
            <p className="text-gray-600 italic">
              "We believe that what you eat defines your life. Let's make it pure."
            </p>
          </section>
        </article>

      </div>
    </div>
  );
};

export default AboutUs;
