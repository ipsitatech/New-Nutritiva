import React, { useState, useRef } from 'react';

const SpendSavingsChart = () => {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Spend and Savings data that sum up to exactly ₹15,600 spent and ₹3,250 saved
  const spendData = [2200, 2900, 2400, 1900, 3100, 3100];
  const savingsData = [450, 600, 500, 400, 650, 650];

  const maxVal = 4000;
  const chartHeight = 220;
  const chartWidth = 560;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Helper to calculate X and Y coordinates
  const getX = (index) => paddingLeft + (index / months.length) * graphWidth + (graphWidth / months.length) / 2;
  const getY = (val) => paddingTop + graphHeight - (val / maxVal) * graphHeight;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Find closest index
    const colWidth = graphWidth / months.length;
    let closestIdx = Math.floor((mouseX - paddingLeft) / colWidth);
    closestIdx = Math.max(0, Math.min(months.length - 1, closestIdx));
    
    setHoverIndex(closestIdx);
    setTooltipPos({
      x: paddingLeft + closestIdx * colWidth + colWidth / 2,
      y: getY(spendData[closestIdx]) - 10
    });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const colWidth = graphWidth / months.length;
  const barWidth = Math.max(10, colWidth * 0.28);

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-100 shadow-xs relative text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">Monthly Spend vs Savings</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Comparing your monthly consumption against cash savings</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-brand-green block"></span>
            <span className="text-slate-600">Spend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 block"></span>
            <span className="text-slate-600">Savings</span>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-visible cursor-crosshair"
      >
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-auto overflow-visible"
        >
          {/* Horizontal Gridlines */}
          {[0, 1000, 2000, 3000, 4000].map((tick) => (
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
                ₹{tick}
              </text>
            </g>
          ))}

          {/* Month labels */}
          {months.map((m, idx) => {
            const xCenter = paddingLeft + idx * colWidth + colWidth / 2;
            return (
              <text 
                key={m} 
                x={xCenter} 
                y={chartHeight - 10} 
                textAnchor="middle" 
                className="text-[10px] fill-slate-400 font-bold"
              >
                {m}
              </text>
            );
          })}

          {/* Bars */}
          {months.map((_, idx) => {
            const xCenter = paddingLeft + idx * colWidth + colWidth / 2;
            
            const spendH = graphHeight - (getY(spendData[idx]) - paddingTop);
            const savingsH = graphHeight - (getY(savingsData[idx]) - paddingTop);
            
            const isHovered = hoverIndex === idx;

            return (
              <g key={idx} className="transition-all duration-300">
                {/* Spend Bar (Forest Green) */}
                <rect
                  x={xCenter - barWidth - 3}
                  y={getY(spendData[idx])}
                  width={barWidth}
                  height={spendH}
                  rx="3"
                  fill="#105335"
                  opacity={hoverIndex === null ? 1 : isHovered ? 1 : 0.45}
                  className="transition-all duration-300"
                />
                
                {/* Savings Bar (Amber Gold) */}
                <rect
                  x={xCenter + 3}
                  y={getY(savingsData[idx])}
                  width={barWidth}
                  height={savingsH}
                  rx="3"
                  fill="#FFB300"
                  opacity={hoverIndex === null ? 1 : isHovered ? 1 : 0.45}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && (
          <div 
            style={{ 
              left: `${(tooltipPos.x / chartWidth) * 100}%`,
              top: `${(tooltipPos.y / chartHeight) * 100 - 15}%`
            }} 
            className="absolute z-10 -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-[11px] rounded-xl p-3 shadow-xl min-w-36 pointer-events-none transition-all duration-75 border border-slate-800"
          >
            <div className="font-semibold border-b border-slate-800 pb-1 mb-1.5">
              <span>{months[hoverIndex]} Spendings</span>
            </div>
            <div className="flex justify-between items-center gap-4 mb-1">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 bg-[#105335] rounded-full"></span> Spent:
              </span>
              <span className="font-bold text-white">₹{spendData[hoverIndex].toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 bg-[#FFB300] rounded-full"></span> Saved:
              </span>
              <span className="font-bold text-amber-400">₹{savingsData[hoverIndex].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendSavingsChart;
