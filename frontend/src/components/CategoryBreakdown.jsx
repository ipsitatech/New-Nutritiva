import React from 'react';

const CategoryBreakdown = () => {
  // Category breakdown that sums up to exactly ₹15,600 spent
  const categories = [
    { name: 'Nuts & Dry Fruits', percentage: 45, spent: 7020, color: '#105335', bgClass: 'bg-[#105335]', fillClass: 'bg-emerald-50 text-[#105335]', icon: '🥜' },
    { name: 'Seeds & Superfoods', percentage: 25, spent: 3900, color: '#f59e0b', bgClass: 'bg-amber-500', fillClass: 'bg-amber-50 text-amber-600', icon: '🌱' },
    { name: 'Healthy Snacks', percentage: 18, spent: 2808, color: '#a855f7', bgClass: 'bg-purple-500', fillClass: 'bg-purple-50 text-purple-600', icon: '🍪' },
    { name: 'Honey & Wellness', percentage: 12, spent: 1872, color: '#3b82f6', bgClass: 'bg-blue-500', fillClass: 'bg-blue-50 text-blue-600', icon: '🍯' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs h-full flex flex-col justify-between text-left">
      <div>
        <h3 className="font-semibold text-slate-800 text-lg">Category Consumption</h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 font-semibold">Distribution of your ₹15,600 total expenditure</p>
      </div>

      <div className="space-y-4 mt-6 flex-grow flex flex-col justify-center">
        {categories.map((c, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg ${c.fillClass} flex items-center justify-center text-sm`}>
                  {c.icon}
                </span>
                <span>{c.name}</span>
              </span>
              <span className="text-slate-500">
                ₹{c.spent.toLocaleString()} <span className="font-black text-[#105335] ml-1">({c.percentage}%)</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${c.bgClass}`}
                style={{ width: `${c.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
