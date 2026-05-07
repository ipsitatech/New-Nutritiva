import React, { useState } from 'react';

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    const faqs = [
        {
            q: "Can I pause or cancel my subscription?",
            a: "Yes! You can pause, skip, or cancel your subscription anytime from your account dashboard. No questions asked."
        },
        {
            q: "When will I receive my first box?",
            a: "Your first box will be shipped within 2–3 business days of subscription. Subsequent boxes will arrive every 30 days."
        },
        {
            q: "Can I customize my subscription box?",
            a: "Absolutely! You can swap products, adjust quantities, and customize your box based on your preferences before each delivery."
        },
        {
            q: "Is there a minimum commitment period?",
            a: "No minimum commitment required. You're free to cancel anytime without any penalties or hidden fees."
        },
        {
            q: "Do you offer bulk or corporate orders?",
            a: "Yes, we offer special pricing for corporate orders. Contact us via WhatsApp for a custom quote within 24 hours."
        },
        {
            q: "Are your products lab tested?",
            a: "Yes, every batch is lab tested for quality, purity, and freshness. We are FSSAI certified and maintain complete transparency in sourcing."
        }
    ];

    return (
        <section className="py-24 bg-white" id="faqs">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-nutri-green bg-nutri-green-pale px-[13px] py-[5px] rounded-full mb-3">Got Questions?</span>
                    <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-[10px] tracking-tight">Frequently Asked <em className="not-italic text-nutri-green">Questions</em></h2>
                </div>
                <div className="max-w-[800px] mx-auto space-y-3.5">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`rounded-2xl border-[1.5px] transition-all duration-300 ${activeIndex === index ? 'border-nutri-green bg-nutri-green-pale/30 shadow-sm' : 'border-border bg-white hover:border-nutri-green/40'}`}>
                            <button className="w-full text-left p-[22px_24px] flex items-center justify-between gap-4" onClick={() => toggleFaq(index)}>
                                <span className={`text-sm font-bold tracking-tight transition-colors ${activeIndex === index ? 'text-nutri-green' : 'text-dark'}`}>{faq.q}</span>
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all text-lg font-medium ${activeIndex === index ? 'bg-nutri-green text-white rotate-180' : 'bg-bg text-text-muted'}`}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="p-[0_24px_24px] text-sm text-text-muted leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faqs;
