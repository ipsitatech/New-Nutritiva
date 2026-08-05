import React, { useState } from "react";
import { Plus, X } from "lucide-react";

import faqData from "../../data/faq.json";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#2D7A4F] mb-3">
          GOT QUESTIONS?
        </p>
        <h2 className="text-3xl font-black text-[#141414] mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden border ${isOpen ? "border-[#2D7A4F]" : "border-[#EAEAEA]"}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-[15px] font-semibold text-[#141414]">
                    {item.question}
                  </span>

                  <span className="ml-4 shrink-0 text-[#2D7A4F]">
                    {isOpen ? <X /> : <Plus />}
                  </span>
                </button>

                <div className={isOpen ? "px-6 pb-5" : "hidden"}>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
