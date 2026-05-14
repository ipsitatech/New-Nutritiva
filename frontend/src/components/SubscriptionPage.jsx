import React from "react";
import { Box, Truck, Gift, CheckSquare, Check } from "lucide-react";

import subscriptionData from "../data/subscription.json";

const ICON_MAP = {
  Box: Box,
  Truck: Truck,
  Gift: Gift,
  CheckSquare: CheckSquare,
};

import WhatsAppIcon from "./WhatsAppIcon";

const SubscriptionPage = () => {
  const WHATSAPP_NUMBER = "917262866254";

  const handleWhatsAppRedirect = (planTitle) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in subscribing to the ${planTitle}. Could you please provide more details?`,
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const { topBenefits, packs, howItWorks } = subscriptionData;

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

        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-100 rounded-xl mb-16 shadow-sm">
          {topBenefits.map((b, i) => {
            const Icon = ICON_MAP[b.icon];
            return (
              <div
                key={i}
                className="flex flex-col items-center p-6 border-r border-gray-100 last:border-0"
              >
                {Icon && <Icon className="w-6 h-6" style={{ color: "#2D7A4F" }} />}
                <span className="text-[11px] font-bold mt-3 text-gray-800 uppercase tracking-tight">
                  {b.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {packs.map((p, i) => {
            return (
              <div
                key={i}
                className={`relative flex flex-col p-6 rounded-[1.2rem] bg-white transition-all duration-300 h-full w-full aspect-[4/5] ${
                  p.isPopular
                    ? "border-2 border-[#2D7A4F] shadow-xl scale-[1.02] z-10"
                    : "border border-gray-200 shadow-sm"
                }`}
              >
                {/* Badge shows if this pack is the popular one */}
                {p.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2D7A4F] text-white px-3 py-1 rounded-full text-[9px] tracking-wide font-bold whitespace-nowrap shadow-sm">
                    MOST POPULAR
                  </span>
                )}

                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-1">Every 30 days</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {p.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-start text-gray-700 text-xs font-medium leading-relaxed">
                      <span className="bg-[#2D7A4F] p-0.5 rounded-md mr-2.5 mt-0.5 shadow-sm shrink-0">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleWhatsAppRedirect(p.title)}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D7A4F] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[#1e5235] transition-colors mt-auto">
                  <WhatsAppIcon size={16} />
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
            <div className="absolute top-8 left-[10%] right-[10%] h-[1px] bg-gray-100 hidden md:block" />

            {howItWorks.map((s, i) => (
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