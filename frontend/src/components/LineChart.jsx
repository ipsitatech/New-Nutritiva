import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../services/AppContext';

const LineChart = () => {
  const { orders, subscriptions } = useApp();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const [filterType, setFilterType] = useState(() => {
    return localStorage.getItem('linechart_filterType') || 'all';
  });
  const [customYear, setCustomYear] = useState(() => {
    return localStorage.getItem('linechart_customYear') || '';
  });
  const [chartYear, setChartYear] = useState(() => {
    const saved = localStorage.getItem('linechart_chartYear');
    return saved ? parseInt(saved, 10) : new Date().getFullYear();
  });
  const [validationError, setValidationError] = useState('');

  // Persist filter values to LocalStorage (TC28)
  useEffect(() => {
    localStorage.setItem('linechart_filterType', filterType);
    localStorage.setItem('linechart_customYear', customYear);
    localStorage.setItem('linechart_chartYear', String(chartYear));
  }, [filterType, customYear, chartYear]);

  const currentYear = new Date().getFullYear();

  // Dynamically compute all unique available years in the database records
  const availableYears = new Set();
  (orders || []).forEach(ord => {
    const dateSrc = ord.created_at || ord.delivery_date;
    if (dateSrc) {
      const d = new Date(dateSrc);
      if (!isNaN(d.getTime())) {
        availableYears.add(d.getFullYear());
      }
    }
  });
  (subscriptions || []).forEach(sub => {
    const dateSrc = sub.created_at || sub.start_date;
    if (dateSrc) {
      const d = new Date(dateSrc);
      if (!isNaN(d.getTime())) {
        availableYears.add(d.getFullYear());
      }
    }
  });
  // Always ensure the current year is in the list
  availableYears.add(currentYear);
  const sortedYears = Array.from(availableYears).sort((a, b) => b - a);

  // Check if there are no records for the active view to display Empty Data Year message (TC29)
  const hasNoData = ordersData.every(v => v === 0) && subsData.every(v => v === 0);

  // Compute dynamic orders data for the selected chartYear
  const ordersData = Array(12).fill(0);
  (orders || []).forEach(ord => {
    const dateSrc = ord.created_at || ord.delivery_date;
    if (dateSrc) {
      const d = new Date(dateSrc);
      if (!isNaN(d.getTime())) {
        if (filterType === 'all' || d.getFullYear() === chartYear) {
          const month = d.getMonth();
          ordersData[month] += Number(ord.total_amount) || 0;
        }
      }
    }
  });

  // Compute dynamic subscriptions data for the selected chartYear
  const subsData = Array(12).fill(0);
  (subscriptions || []).forEach(sub => {
    const dateSrc = sub.created_at || sub.start_date;
    if (dateSrc) {
      const d = new Date(dateSrc);
      if (!isNaN(d.getTime())) {
        if (filterType === 'all' || d.getFullYear() === chartYear) {
          const month = d.getMonth();
          const planName = (sub.plan_name || '').toLowerCase();
          let amount = 0;
          if (planName.includes('platinum')) {
            amount = planName.includes('year') ? 2399 : 299;
          } else if (planName.includes('pro')) {
            amount = planName.includes('year') ? 1199 : 149;
          }
          subsData[month] += amount;
        }
      }
    }
  });

  // Calculate unique years present in each month's orders/subscriptions for tooltip label
  const monthYears = Array(12).fill(null).map(() => new Set());
  (orders || []).forEach(ord => {
    const dateSrc = ord.created_at || ord.delivery_date;
    if (dateSrc) {
      const d = new Date(dateSrc);
      if (!isNaN(d.getTime())) {
        monthYears[d.getMonth()].add(d.getFullYear());
      }
    }
  });
  (subscriptions || []).forEach(sub => {
    const dateSrc = sub.created_at || sub.start_date;
    if (dateSrc) {
      const d = new Date(dateSrc);
      if (!isNaN(d.getTime())) {
        monthYears[d.getMonth()].add(d.getFullYear());
      }
    }
  });

  const maxVal = Math.max(600, ...ordersData, ...subsData);
  
  const ticks = [];
  for (let i = 0; i <= 6; i++) {
    ticks.push(Math.round((maxVal / 6) * i));
  }

  const chartHeight = 220;
  const chartWidth = 560;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleCustomYearChange = (e) => {
    const val = e.target.value;
    setCustomYear(val);
    
    if (!/^\d{4}$/.test(val)) {
      setValidationError('Validation: Please enter a valid 4-digit year');
    } else {
      const yearInt = parseInt(val, 10);
      if (yearInt < 2000 || yearInt > currentYear + 10) {
        setValidationError(`Validation: Year must be between 2000 and ${currentYear + 10}`);
      } else {
        setValidationError('');
        setChartYear(yearInt); // Update graph dynamically in real-time
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (/^\d{4}$/.test(customYear)) {
        const yearInt = parseInt(customYear, 10);
        if (yearInt >= 2000 && yearInt <= currentYear + 10) {
          setChartYear(yearInt);
          setValidationError('');
        }
      }
    }
  };

  // Helper to calculate X and Y coordinates
  const getX = (index) => paddingLeft + (index / (months.length - 1)) * graphWidth;
  const getY = (val) => paddingTop + graphHeight - (val / maxVal) * graphHeight;

  // Build SVG path string for lines (with bezier curves)
  const getCurvePath = (data) => {
    let path = `M ${getX(0)} ${getY(data[0])}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(data[i]);
      const x2 = getX(i + 1);
      const y2 = getY(data[i + 1]);
      // Control points for smooth bezier curve
      const cpX1 = x1 + graphWidth / (months.length - 1) / 3;
      const cpY1 = y1;
      const cpX2 = x2 - graphWidth / (months.length - 1) / 3;
      const cpY2 = y2;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return path;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Find closest index
    let closestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i < months.length; i++) {
      const diff = Math.abs(getX(i) - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setHoverIndex(closestIdx);
    setTooltipPos({
      x: getX(closestIdx),
      y: (getY(ordersData[closestIdx]) + getY(subsData[closestIdx])) / 2
    });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-100 shadow-xs relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 text-lg">Health & Purchase Analytics</h3>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-600 block"></span>
            <span className="text-slate-600 font-medium">Orders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
            <span className="text-slate-600 font-medium">Subscriptions</span>
          </div>
          <div className="flex flex-col items-end gap-1.5 relative">
            <select 
              value={filterType}
              onChange={(e) => {
                const val = e.target.value;
                setFilterType(val);
                if (val !== 'custom') {
                  setCustomYear('');
                  setValidationError('');
                  if (val !== 'all') {
                    setChartYear(parseInt(val, 10));
                  }
                }
              }}
              className="border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-600 font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              {sortedYears.map(yr => (
                <option key={yr} value={String(yr)}>{yr}</option>
              ))}
              <option value="custom">Custom Year...</option>
            </select>
            
            {filterType === 'custom' && (
              <div className="flex flex-col items-end absolute right-0 top-9 bg-white border border-slate-200 rounded-xl p-3 shadow-md z-30 min-w-44">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Enter Year:</span>
                <input 
                  type="text"
                  placeholder="e.g. 2025"
                  value={customYear}
                  onChange={handleCustomYearChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-brand-green"
                />
                {validationError && (
                  <span className="text-[9px] text-red-500 font-bold block mt-1.5 text-right w-full leading-tight">
                    {validationError}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-visible cursor-crosshair min-h-[220px]"
      >
        {hasNoData && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
            <span className="text-slate-500 font-bold text-sm bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              No Data Available
            </span>
          </div>
        )}
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-auto overflow-visible"
        >
          {/* Horizontal Gridlines */}
          {ticks.map((tick) => (
            <g key={tick}>
              <line 
                x1={paddingLeft} 
                y1={getY(tick)} 
                x2={chartWidth - paddingRight} 
                y2={getY(tick)} 
                stroke="#f1f5f9" 
                strokeWidth={tick === 0 ? 1.5 : 1}
              />
              <text 
                x={paddingLeft - 10} 
                y={getY(tick) + 4} 
                textAnchor="end" 
                className="text-[10px] fill-slate-400 font-medium"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Month labels */}
          {months.map((m, idx) => (
            <text 
              key={m} 
              x={getX(idx)} 
              y={chartHeight - 10} 
              textAnchor="middle" 
              className="text-[10px] fill-slate-400 font-semibold"
            >
              {m}
            </text>
          ))}

          {/* Area under curves for premium glow */}
          <path
            d={`${getCurvePath(ordersData)} L ${getX(months.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`}
            fill="url(#green-gradient)"
            opacity="0.04"
          />
          <path
            d={`${getCurvePath(subsData)} L ${getX(months.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`}
            fill="url(#orange-gradient)"
            opacity="0.03"
          />

          {/* Defining gradients */}
          <defs>
            <linearGradient id="green-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="orange-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subscription Line (Orange) */}
          <path 
            d={getCurvePath(subsData)} 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Orders Line (Green) */}
          <path 
            d={getCurvePath(ordersData)} 
            fill="none" 
            stroke="#16a34a" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Hover effects */}
          {hoverIndex !== null && (
            <>
              {/* Vertical line indicator */}
              <line 
                x1={getX(hoverIndex)} 
                y1={paddingTop} 
                x2={getX(hoverIndex)} 
                y2={chartHeight - paddingBottom} 
                stroke="#cbd5e1" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />

              {/* Order data point circle */}
              <circle 
                cx={getX(hoverIndex)} 
                cy={getY(ordersData[hoverIndex])} 
                r="6" 
                fill="#16a34a" 
                stroke="#ffffff" 
                strokeWidth="2" 
                className="shadow-sm"
              />

              {/* Subscription data point circle */}
              <circle 
                cx={getX(hoverIndex)} 
                cy={getY(subsData[hoverIndex])} 
                r="6" 
                fill="#f59e0b" 
                stroke="#ffffff" 
                strokeWidth="2" 
                className="shadow-sm"
              />
            </>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && (
          <div 
            style={{ 
              left: `${(tooltipPos.x / chartWidth) * 100}%`,
              top: `${(tooltipPos.y / chartHeight) * 100 - 30}%`
            }} 
            className="absolute z-10 -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl min-w-36 pointer-events-none transition-all duration-75 border border-slate-800"
          >
            <div className="font-semibold border-b border-slate-800 pb-1 mb-1.5 flex justify-between">
              <span>
                {months[hoverIndex]}{' '}
                {filterType === 'all'
                  ? monthYears[hoverIndex] && monthYears[hoverIndex].size > 0
                    ? `(${Array.from(monthYears[hoverIndex]).sort().join(', ')})`
                    : '(All Years)'
                  : chartYear}
              </span>
            </div>
            <div className="flex justify-between items-center gap-4 mb-0.5">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Orders:
              </span>
              <span className="font-bold text-green-400">₹{ordersData[hoverIndex].toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Subs:
              </span>
              <span className="font-bold text-amber-400">₹{subsData[hoverIndex].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
