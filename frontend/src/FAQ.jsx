import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const faqData = [
  {
    question: "Can I pause or cancel my subscription?",
    answer:
      "Yes! You can pause, skip, or cancel your subscription anytime from your account dashboard. No questions asked.",
  },
  {
    question: "When will I receive my first box?",
    answer:
      "Your first box will be delivered within 2–5 business days depending on your location.",
  },
  {
    question: "Can I customize my subscription box?",
    answer:
      "Yes, you can customize your box with your preferred products and quantities.",
  },
  {
    question: "Is there a minimum commitment period?",
    answer:
      "No, there is no minimum commitment. You can cancel anytime.",
  },
  {
    question: "Do you offer bulk or corporate orders?",
    answer:
      "Yes, we provide corporate bulk orders with special pricing and custom branding.",
  },
  {
    question: "Are your products lab tested?",
    answer:
      "Yes, all our products are FSSAI certified and lab tested for quality assurance.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-[100px] font-['Inter',sans-serif]">
      <div className="max-w-[880px] mx-auto">
        
        <p className="text-center text-xs text-[#9ca3af] tracking-[1px] mb-[10px]">
          GOT QUESTIONS?
        </p>
        <h2 className="text-center text-[34px] font-semibold text-[#111827] mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`border rounded-xl py-5 px-6 cursor-pointer transition-all duration-200 ease-out ${
                  isOpen 
                    ? "border-[#1f7a5a] bg-[#f3fbf7]" 
                    : "border-[#e5e7eb] bg-white"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[15.5px] font-medium text-[#111827]">
                    {item.question}
                  </span>

                  {isOpen ? (
                    <FiX className="text-[20px] text-[#1f7a5a]" />
                  ) : (
                    <FiPlus className="text-[20px] text-[#1f7a5a]" />
                  )}
                </div>

                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[220px]" : "max-h-0"
                  }`}
                >
                  <p className="mt-[14px] text-sm text-[#6b7280] leading-relaxed">
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