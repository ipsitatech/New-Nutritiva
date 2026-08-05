import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "./Card";
import { ORDERS_DATA, TODAY_STR } from "./statsData";

export function DateBadge({ light }) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold px-2.5 py-[3px] rounded-full tracking-wide self-start shrink-0 ${light ? "bg-[#eef6f1] text-[#2d7a4f]" : "bg-white/10 text-white/55"}`}
    >
      {TODAY_STR}
    </span>
  );
}

export function SalesTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg py-1.5 px-2.5 shadow-lg">
      <p className="text-[9px] text-gray-400 font-semibold mb-0.5">{label}</p>
      <p className="text-[11px] font-extrabold text-[#2d7a4f]">
        {payload[0].value} orders
      </p>
    </div>
  );
}

export default function QuickSalesCard() {
  return (
    <Card bg="bg-white border border-gray-100 shadow-sm" square>
      <div className="flex items-start justify-between shrink-0 mb-3">
        <div>
          <p className="text-[13px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Orders Fulfilled
          </p>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
            Last 7 days
          </p>
        </div>
        <DateBadge light />
      </div>

      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={1}
          minHeight={1}
        >
          <LineChart
            data={ORDERS_DATA}
            margin={{ top: 4, right: 4, left: -22, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#f3f4f6"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 9.5,
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#d1d5db", fontSize: 9, fontFamily: "inherit" }}
              width={26}
            />
            <Tooltip
              content={<SalesTooltip />}
              cursor={{
                stroke: "#2d7a4f",
                strokeWidth: 1,
                strokeDasharray: "4 2",
              }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2d7a4f"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#2d7a4f", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#1e5235", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
