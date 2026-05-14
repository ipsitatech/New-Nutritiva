import React, { useState, useEffect } from "react";
import { Sparkles, Zap, Flame, Rocket } from "lucide-react";

const DISCOUNTS = [
  {
    icon: Flame,
    text: "Hot Deal: Flat 20% OFF on all Exotic Nuts!",
    code: "NUTRI20",
    color: "#FF4D4D"
  },
  {
    icon: Zap,
    text: "Flash Sale: Save 15% on Subscription Packs",
    code: "SUB15",
    color: "#FFD700"
  },
  {
    icon: Rocket,
    text: "Free Express Shipping on orders above ₹1499",
    code: "FREESHIP",
    color: "#00E676"
  },
  {
    icon: Sparkles,
    text: "First Order Special: Get 10% Extra Cashback",
    code: "WELCOME10",
    color: "#BA68C8"
  }
];

export default function DiscountSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % DISCOUNTS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const current = DISCOUNTS[index];
  const Icon = current.icon;

  return (
    <section className="w-full bg-[#F9F9F9] h-24 border-b border-[#EAEAEA] flex items-center relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10">
        <div 
          key={index}
          className="flex items-center justify-between animate-in fade-in slide-in-from-right-4 duration-1000"
        >
          {/* Minimal Offer Details */}
          <div className="flex items-center gap-5">
            <div 
              className="w-12 h-12 rounded-xl bg-[#2D7A4F]/10 flex items-center justify-center text-[#2D7A4F]"
            >
              <Icon size={26} strokeWidth={2.5} />
            </div>
            <h2 className="text-[#141414] text-lg md:text-xl font-bold tracking-tight">
              {current.text.includes(':') ? current.text.split(':')[1].trim() : current.text}
            </h2>
          </div>
          
          {/* Clean Coupon Card */}
          <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-[#EAEAEA] shadow-sm">
            <div className="flex flex-col items-start leading-none mr-2">
              <span className="text-[#787878] text-[10px] font-bold uppercase tracking-widest mb-1">Coupon Code</span>
              <span className="text-[#141414] text-lg font-black font-mono tracking-tight">{current.code}</span>
            </div>
            <button 
              className="bg-[#2D7A4F] text-white px-6 py-2 rounded-xl font-bold text-xs tracking-wide hover:bg-[#256641] transition-all active:scale-95"
              onClick={() => {
                navigator.clipboard.writeText(current.code);
              }}
            >
              COPY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
