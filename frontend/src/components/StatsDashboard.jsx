import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import almondImg from "../assets/product_imgs/almonds.png";
import walnutImg from "../assets/product_imgs/walnuts.png";
import cashewImg from "../assets/product_imgs/cashews_bowl.png";
import pistachioImg from "../assets/product_imgs/pistachios.png";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const today = new Date();
const fmt = (d) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const TODAY_STR = fmt(today);

const ORDERS_DATA = (() => {
  const base = [124, 98, 152, 116, 178, 143, 195];
  return base.map((v, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return { day: d.toLocaleDateString("en-GB", { weekday: "short" }), orders: v };
  });
})();

const ACTIVE_ORDERS = 142;
const TOTAL_PRODUCTS = 38;

const LOCATION_DATA = [
  { city: "Mumbai",    orders: 154 },
  { city: "Delhi",     orders: 138 },
  { city: "Bangalore", orders: 127 },
  { city: "Hyderabad", orders: 112 },
  { city: "Chennai",   orders: 98  },
  { city: "Pune",      orders: 84  },
  { city: "Ahmedabad", orders: 67  },
  { city: "Kolkata",   orders: 54  },
];

const TOP_PRODUCTS = [
  { name: "Premium Almonds",  qty: "500 kg", img: almondImg },
  { name: "Kashmiri Walnuts", qty: "320 kg", img: walnutImg },
  { name: "Roasted Cashews",  qty: "280 kg", img: cashewImg },
  { name: "Pistachios",       qty: "210 kg", img: pistachioImg },
];

/* ─────────────────────────────────────────────
   DATE BADGE
───────────────────────────────────────────── */

function DateBadge({ light }) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold px-2.5 py-[3px] rounded-full tracking-wide self-start shrink-0 ${
        light ? "bg-[#eef6f1] text-[#2d7a4f]" : "bg-white/10 text-white/55"
      }`}
    >
      {TODAY_STR}
    </span>
  );
}

/* ─────────────────────────────────────────────
   TOOLTIP
───────────────────────────────────────────── */

function SalesTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg py-1.5 px-2.5 shadow-lg">
      <p className="text-[9px] text-gray-400 font-semibold mb-0.5">{label}</p>
      <p className="text-[11px] font-extrabold text-[#2d7a4f]">{payload[0].value} orders</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARD SHELL — shared wrapper
───────────────────────────────────────────── */

function Card({ bg, children, className = "", square = false }) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col min-h-0 overflow-hidden w-full ${square ? 'aspect-square' : 'h-full'} ${bg} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COL 1 — ACTIVE ORDERS
───────────────────────────────────────────── */

function ActiveOrdersCard() {
  return (
    <Card bg="bg-[#233C27]" square>
      <div className="flex flex-col items-start w-full shrink-0">
        <p className="text-[11px] font-medium text-white/60">{TODAY_STR}</p>
        <p className="text-[15px] font-bold text-white mt-0.5">Active Orders</p>
      </div>
      <div className="flex-1 flex items-end justify-start min-h-0 w-full mt-2">
        <p className="text-[80px] lg:text-[100px] font-extrabold text-white leading-none  -mb-2">
          {ACTIVE_ORDERS}
        </p>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   COL 2 — TOTAL PRODUCTS LISTED
───────────────────────────────────────────── */

function TotalProductsCard() {
  return (
    <Card bg="bg-[#325530]" square>
      <div className="flex flex-col items-start w-full shrink-0">
        <p className="text-[11px] font-medium text-white/60">{TODAY_STR}</p>
        <p className="text-md font-bold text-white mt-0.5">Total Products</p>
      </div>
      <div className="flex-1 flex items-end justify-start min-h-0 w-full mt-2">
        <p className="text-6xl lg:text-[100px] font-extrabold text-white leading-none  -mb-2">
          {TOTAL_PRODUCTS}
        </p>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   COL 3 — TOP SELLING PRODUCTS
───────────────────────────────────────────── */

function TopSellingCard() {
  return (
    <Card bg="bg-[#2F502D]" square>
      {/* Header */}
      <div className="shrink-0 mb-2">
        <p className="text-[13px] font-bold text-white mt-2 mb-2">
          Top Selling Products
        </p>
        <div className="h-px bg-white/10" />
      </div>

      {/* Product list — evenly fills remaining space */}
      <ul className="flex flex-col flex-1 min-h-0 justify-around list-none">
        {TOP_PRODUCTS.map((p) => (
          <li
            key={p.name}
            className="flex items-center gap-2.5 px-1.5 py-1 rounded-xl hover:bg-white/8 transition-colors cursor-default"
          >
            {/* Image tile — covers fully */}
            {/* <div className="w-9 h-9 shrink-0 rounded-xl overflow-hidden bg-white/10">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div> */}
            <p className="flex-1 text-[12px] font-semibold text-white/85 truncate min-w-0 leading-tight">
              {p.name}
            </p>
            <span className="text-[11.5px] font-extrabold text-white/60 shrink-0 tabular-nums">
              {p.qty}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   COL 4 — ORDERS FULFILLED (Line Chart)
───────────────────────────────────────────── */

function QuickSalesCard() {
  return (
    <Card bg="bg-white border border-gray-100 shadow-sm" square>
      {/* Header */}
      <div className="flex items-start justify-between shrink-0 mb-3">
        <div>
          <p className="text-[13px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Orders Fulfilled
          </p>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">Last 7 days</p>
        </div>
        <DateBadge light />
      </div>

      {/* Chart — takes remaining height */}
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <LineChart data={ORDERS_DATA} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f3f4f6" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 9.5, fontFamily: "inherit", fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#d1d5db", fontSize: 9, fontFamily: "inherit" }}
              width={26}
            />
            <Tooltip
              content={<SalesTooltip />}
              cursor={{ stroke: "#2d7a4f", strokeWidth: 1, strokeDasharray: "4 2" }}
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

/* ─────────────────────────────────────────────
   COL 5 — ORDERS BY LOCATION
───────────────────────────────────────────── */

function LocationCard() {
  return (
    <Card bg="bg-[#5B3F2F]" square>
      {/* Header */}
      <div className="shrink-0 mb-2">
        <DateBadge />
        <p className="text-[9.5px] font-bold tracking-[0.1em] uppercase text-white/40 mt-2 mb-2">
          Orders by Location
        </p>
        <div className="h-px bg-white/10" />
      </div>

      {/* Table — flex-1 with overflow hidden so it never escapes card */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <table className="w-full text-left border-collapse h-full">
          <thead className="shrink-0">
            <tr>
              <th className="pb-1.5 text-[10px] font-semibold text-white/35">Location</th>
              <th className="pb-1.5 text-[10px] font-semibold text-white/35 text-right">Orders</th>
            </tr>
          </thead>
          <tbody>
            {LOCATION_DATA.map((l, idx) => (
              <tr
                key={l.city}
                className={idx !== LOCATION_DATA.length - 1 ? "border-b border-white/[0.06]" : ""}
              >
                <td className="py-[5px] text-[11.5px] font-semibold text-white/80">{l.city}</td>
                <td className="py-[5px] text-[11.5px] font-extrabold text-white text-right tabular-nums">
                  {l.orders}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */

export default function StatsDashboard() {
  return (
    <div className="min-h-1/2 w-full bg-[#f0f2ef] flex items-center justify-center px-4 md:px-8 lg:px-10 py-10 font-['DM_Sans',sans-serif]">
      {/* All cards in one row as squares */}
      <div className="w-full max-w-[1400px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 items-stretch">
        <ActiveOrdersCard />
        <TotalProductsCard />
        <TopSellingCard />
        <QuickSalesCard />
        <LocationCard />
      </div>
    </div>
  );
}