import React from 'react';
import { CheckCircle2, Truck, ShieldCheck, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-800" />,
      title: "100% Authentic",
      description: "Premium Grade Products directly from source farms. No adulteration, no compromise."
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-800" />,
      title: "Fast Delivery",
      description: "Pan India shipping within 2-5 business days. Express delivery in metro cities."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-800" />,
      title: "Hygienic Packaging",
      description: "Temperature-controlled, airtight packaging preserves freshness for months."
    },
    {
      icon: <Star className="w-6 h-6 text-emerald-800" />,
      title: "Quality Assured",
      description: "FSSAI certified. Transparent sourcing with full lab certifications available."
    }
  ];

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
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50 mb-6">
                {feature.icon}
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