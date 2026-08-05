import React, { useState, useEffect } from 'react';
import { useApp } from '../services/AppContext';

const DoughnutChart = () => {
  const { orders } = useApp();
  const [filterType, setFilterType] = useState('all');
  const [chartYear, setChartYear] = useState(new Date().getFullYear());

  // Keep year filter state in sync with LineChart via localStorage
  useEffect(() => {
    const updateFilter = () => {
      setFilterType(localStorage.getItem('linechart_filterType') || 'all');
      const savedYear = localStorage.getItem('linechart_chartYear');
      setChartYear(savedYear ? parseInt(savedYear, 10) : new Date().getFullYear());
    };

    updateFilter();
    window.addEventListener('storage', updateFilter);
    const interval = setInterval(updateFilter, 500);

    return () => {
      window.removeEventListener('storage', updateFilter);
      clearInterval(interval);
    };
  }, []);

  // Filter orders for the active filter period
  const yearOrders = (orders || []).filter(ord => {
    const dateSrc = ord.created_at || ord.delivery_date;
    if (!dateSrc) return false;
    const d = new Date(dateSrc);
    return !isNaN(d.getTime()) && (filterType === 'all' || d.getFullYear() === chartYear);
  });

  const hasNoData = yearOrders.length === 0;

  // Goals data conforming to: Protein Intake (green), Healthy Snacks (orange), Superfoods (purple), Organic Products (blue)
  const goals = [
    { name: 'Protein Intake', percentage: 85, color: '#16a34a', bgClass: 'bg-green-600', radius: 70, strokeDash: 2 * Math.PI * 70 },
    { name: 'Healthy Snacks', percentage: 70, color: '#f59e0b', bgClass: 'bg-amber-500', radius: 54, strokeDash: 2 * Math.PI * 54 },
    { name: 'Superfoods', percentage: 60, color: '#a855f7', bgClass: 'bg-purple-500', radius: 38, strokeDash: 2 * Math.PI * 38 },
    { name: 'Organic Products', percentage: 50, color: '#3b82f6', bgClass: 'bg-blue-500', radius: 22, strokeDash: 2 * Math.PI * 22 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs h-full flex flex-col relative">
      <h3 className="font-semibold text-slate-800 text-lg mb-4 text-left">Nutrition Goals</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center min-h-[220px]">
        {hasNoData ? (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3 border border-slate-100">
              <span className="text-2xl">🌱</span>
            </div>
            <span className="text-slate-500 font-bold text-sm">No Data Available</span>
            <span className="text-[10px] text-slate-400 mt-1 max-w-44 leading-relaxed">
              Place orders or select a year with transactions to see your nutrition goals progress.
            </span>
          </div>
        ) : (
          <>
            {/* Radial SVG Chart */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                {goals.map((g, idx) => {
                  const dashOffset = g.strokeDash - (g.percentage / 100) * g.strokeDash;
                  return (
                    <g key={idx}>
                      {/* Track ring */}
                      <circle
                        cx="80"
                        cy="80"
                        r={g.radius}
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="8"
                      />
                      {/* Active progress ring */}
                      <circle
                        cx="80"
                        cy="80"
                        r={g.radius}
                        fill="none"
                        stroke={g.color}
                        strokeWidth="8"
                        strokeDasharray={g.strokeDash}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </g>
                  );
                })}
              </svg>
              
              {/* Central content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-800">80%</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Achieved</span>
              </div>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full text-xs mt-2 text-left">
              {goals.map((g, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${g.bgClass} shrink-0`}></span>
                  <span className="text-slate-500 font-medium truncate">{g.name}</span>
                  <span className="text-slate-800 font-bold ml-auto">{g.percentage}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
