import React, { useState } from "react";
import { Plus, X } from "lucide-react";

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
    <section className="faq">
      <div className="faq-container">
        
        <p className="faq-label">
          GOT QUESTIONS?
        </p>
        <h2 className="faq-title">
          Frequently Asked Questions
        </h2>

        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-header">
                  <span className="faq-question">
                    {item.question}
                  </span>

                  {isOpen ? (
                    <X className="faq-icon" />
                  ) : (
                    <Plus className="faq-icon" />
                  )}
                </div>

                <div className={`faq-body ${isOpen ? "open" : ""}`}>
                  <p>
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