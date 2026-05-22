import React, { useState } from "react";
import { Plus, X } from "lucide-react";

import faqData from "../../data/faq.json";

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