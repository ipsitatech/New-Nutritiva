import React, { useState } from "react";
import { Box, Truck, Gift, CheckSquare, Check } from "lucide-react";

import WhatsAppIcon from "./components/WhatsAppIcon";

const SubscriptionPage = () => {
  const [selectedPack, setSelectedPack] = useState("Wellness Box");
  const WHATSAPP_NUMBER = "917262866254";

  const handleWhatsAppRedirect = (planTitle) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in subscribing to the ${planTitle}. Could you please provide more details?`,
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const topBenefits = [
    {
      icon: <Box className="w-6 h-6 text-[#c2916b]" />,
      text: "Curated Monthly Boxes",
    },
    {
      icon: <Truck className="w-6 h-6 text-[#f97316]" />,
      text: "Free Delivery",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#ef4444]" />,
      text: "Exclusive Gifts",
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-[#2D7A4F]" />,
      text: "Flexible Plans",
    },
  ];

  const packs = [
    {
      title: "Wellness Box",
      features: [
        "500g Premium Almonds",
        "500g Mixed Nuts",
        "250g Goji Berries",
        "500g Chia Seeds",
        "Free Recipe Card",
      ],
      isPopular: true,
    },
    {
      title: "Family Pack",
      features: [
        "1kg Premium Almonds",
        "1kg Cashews",
        "500g Walnuts",
        "500g Dates",
        "500g Raisins",
        "Free Storage Container",
      ],
      isPopular: false,
    },
    {
      title: "Superfood Box",
      features: [
        "250g Goji Berries",
        "500g Chia Seeds",
        "500g Pumpkin Seeds",
        "250g Flax Seeds",
        "Health Guide Book",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="bg-white py-16 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-[#2D7A4F] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Save up to 30%
          </span>
          <h1 className="text-4xl font-bold mt-4 text-gray-900">
            Subscription <span className="text-[#2D7A4F]">Packs</span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Get your favourite premium dry fruits delivered every month. Cancel
            anytime, no commitments.
          </p>
        </div>

        {/* Top Benefits Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-100 rounded-xl mb-16 shadow-sm">
          {topBenefits.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 border-r border-gray-100 last:border-0"
            >
              {b.icon}
              <span className="text-[11px] font-bold mt-3 text-gray-800 uppercase tracking-tight">
                {b.text}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-stretch">
          {packs.map((p, i) => {
            // Check if THIS specific card is the one selected

            const isSelected = selectedPack === p.title;

            return (
              <div
                key={i}
                onClick={() => setSelectedPack(p.title)} // Updates state on click
                className={`relative flex flex-col p-8 rounded-[1.2rem] border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#2D7A4F] shadow-xl scale-[1.02]"
                    : "border-gray-200 shadow-sm opacity-80"
                }`}
              >
                {/* Badge only shows if this pack is selected */}

                {isSelected && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2D7A4F] text-white px-4 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">
                    MOST POPULAR
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">Every 30 days</p>
                </div>

                <ul className="space-y-4 mb-10 grow">
                  {p.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center text-gray-700 text-sm font-medium">
                      <span className="bg-[#2D7A4F] p-0.5 rounded-md mr-3 shadow-sm">
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the card click from firing when clicking the button
                    handleWhatsAppRedirect(p.title);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D7A4F] text-white font-bold py-4 rounded-2xl hover:bg-[#1e5235]">
                  <WhatsAppIcon size={18} />
                  Enquire Now
                </button>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mt-8 border border-gray-100 rounded-[1.2rem] p-12 md:p-20 text-center bg-white shadow-sm">
          <h2 className="text-3xl font-bold mb-16 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gray-100 hidden md:block" />

            {[
              {
                n: 1,
                t: "Choose Your Plan",
                d: "Pick the subscription that fits your lifestyle",
              },
              {
                n: 2,
                t: "Customize",
                d: "Personalize your box based on preferences",
              },
              {
                n: 3,
                t: "Receive Monthly",
                d: "Fresh products delivered to your door",
              },
              { n: 4, t: "Enjoy & Save", d: "Save up to 30% on every order" },
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#2D7A4F] text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                  {s.n}
                </div>
                <h4 className="font-bold text-sm text-gray-900 mb-2">{s.t}</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed max-w-[140px]">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
