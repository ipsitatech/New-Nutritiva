import React from 'react';
import { CheckCircle2, Truck, ShieldCheck, Star } from 'lucide-react';

import featuresData from "../../data/features.json";

const ICON_MAP = {
  CheckCircle2: CheckCircle2,
  Truck: Truck,
  ShieldCheck: ShieldCheck,
  Star: Star,
};

const FeaturesSection = () => {
  const features = featuresData;


  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md bg-white"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#eff7f2] mb-6">
                {(() => {
                  const Icon = ICON_MAP[feature.icon];
                  return Icon ? <Icon className="w-6 h-6 text-[#2D7A4F]" /> : null;
                })()}
              </div>

              {/* Content */}
              <h3 className="text-gray-900 font-bold text-lg mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;