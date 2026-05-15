import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

/* ─────────────────────────────────────────────
   CONSTANTS & DATA
───────────────────────────────────────────── */

const COUNTER_INTERVAL_MS = 20 * 1000;
const TABLE_UPDATE_MS = 5 * 60 * 1000;
const MAX_ROWS = 4;

const CURRENCY_CONFIG = {
  INR: {
    fromInr: (v) => Math.round(v),
    fmt: (n) => "₹" + n.toLocaleString("en-IN"),
  },
  USD: {
    fromInr: (v) => v / 83,
    fmt: (n) =>
      "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  VND: {
    fromInr: (v) => Math.round(v * 305),
    fmt: (n) => n.toLocaleString("vi-VN") + " ₫",
  },
};

const CATALOG = [
  { product: "Californian Almond", location: "Mumbai", qty: "40 kgs", totalInr: 29000 },
  { product: "Afghan Dates", location: "Pune", qty: "40 kgs", totalInr: 18800 },
  { product: "American Pistachios", location: "Hanoi", qty: "100 kgs", totalInr: 108500 },
  { product: "Californian Almond", location: "Mumbai", qty: "40 kgs", totalInr: 29000 },
];

const SAMPLE_ORDERS_BY_DAY = [148, 192, 221, 175, 203, 236, 189];

function buildLast7Days() {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
    out.push({ name: `${wd} ${d.getDate()}`, orders: SAMPLE_ORDERS_BY_DAY[6 - i] });
  }
  return out;
}

const CHART_DATA = buildLast7Days();

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */

/** Animates a number from `from` to `to` using cubic ease-out, ~520ms */
function useAnimatedCounter(target) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current;
    prevTarget.current = target;
    const delta = target - start;
    const duration = 520;
    const t0 = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    function tick(now) {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(start + delta * eased);
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target]);

  return display;
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/* Counter card */
function CounterCard({ target }) {
  const display = useAnimatedCounter(target);
  const [popping, setPopping] = useState(false);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (target !== prevTarget.current) {
      prevTarget.current = target;
      setPopping(false);
      // re-trigger after brief delay so animation re-fires
      const id = setTimeout(() => setPopping(true), 30);
      return () => clearTimeout(id);
    }
  }, [target]);

  return (
    <section
      className="bento-card lg:col-span-4 flex flex-col justify-center min-h-[200px] p-5 sm:p-6 lg:aspect-square lg:min-h-0"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center flex-1 text-center min-w-0 w-full -my-1">
        <span
          className={`stat-counter-num tabular-nums font-extrabold text-nut leading-none block w-full max-w-full ${popping ? "animate-counter-pop" : ""
            }`}
          onAnimationEnd={() => setPopping(false)}
        >
          {display}
        </span>
        <p className="mt-2 sm:mt-3 text-xs text-nut/65 font-semibold leading-snug max-w-[13rem] px-1">
          New orders in past 5 mins
        </p>
      </div>
    </section>
  );
}

/* Weekly bar chart */
const AXIS_LABEL_STYLE = { fill: "#3d6b4f", fontSize: 11, fontWeight: 700 };

function WeeklyChart() {
  return (
    <section className="bento-card lg:col-span-8 p-4 sm:p-5 min-h-[240px] lg:min-h-[260px] flex flex-col">
      <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.12em] text-nut/55 mb-3">
        Last 7 days
      </h2>
      <div className="flex-1 w-full min-h-[200px] lg:min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <BarChart
            data={CHART_DATA}
            margin={{ top: 12, right: 8, left: 30, bottom: 32 }}
            barCategoryGap="6%"
            barGap={2}
          >
            <defs>
              <linearGradient id="nutBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#1a6b3c" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(26,107,60,0.1)"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: "rgba(26,107,60,0.18)" }}
              tick={{ fill: "#4a7c5c", fontSize: 11, fontWeight: 600 }}
              interval={0}
              angle={0}
              textAnchor="middle"
              height={36}
              label={{
                value: "Date",
                position: "insideBottom",
                offset: -12,
                style: AXIS_LABEL_STYLE,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "rgba(26,107,60,0.18)" }}
              tick={{ fill: "#4a7c5c", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(v) => String(Math.round(Number(v)))}
              width={30}
              label={{
                value: "Orders",
                angle: -90,
                position: "insideLeft",
                style: { ...AXIS_LABEL_STYLE, textAnchor: "middle" },
                offset: 0,
              }}
            />
            <Bar
              dataKey="orders"
              fill="url(#nutBar)"
              stroke="#15573a"
              strokeWidth={1}
              radius={[8, 8, 8, 8]}
              maxBarSize={56}
            >
              <LabelList
                dataKey="orders"
                position="top"
                fill="#1a6b3c"
                fontSize={11}
                fontWeight={700}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/* Currency toggle */
function CurrencyToggle({ currency, onChange }) {
  return (
    <div
      className="inline-flex rounded-full border border-nut/12 bg-[#ecfdf0]/35 p-1 shrink-0"
      role="group"
      aria-label="Currency"
    >
      {["USD", "INR", "VND"].map((c) => {
        const active = c === currency;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c)}
            className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-colors ${active
                ? "bg-nut text-white shadow-sm"
                : "text-nut/55"
              }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

/* Orders table */
function OrdersTable({ orders, currency }) {
  const { fromInr, fmt } = CURRENCY_CONFIG[currency];

  return (
    <section className="bento-card lg:col-span-12 p-4 sm:p-5">
      <div className="flex flex-row items-center justify-between gap-3 mb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-nut/55 shrink-0">
          Recent <span className="text-nut">({orders.length})</span>
        </h2>
        {/* Currency toggle is passed as a slot via children to keep this component pure */}
      </div>
      <div className="rounded-2xl border border-[rgba(26,107,60,0.12)] bg-white">
        <table className="w-full table-fixed text-left text-xs sm:text-[13px] border-collapse">
          <colgroup>
            <col className="w-[32%]" />
            <col className="w-[18%]" />
            <col className="w-[28%]" />
            <col className="w-[22%]" />
          </colgroup>
          <thead>
            <tr className="bg-[#ecfdf0]/45 text-nut/80">
              {["Product", "Location", "Total", "Qty"].map((h, i) => (
                <th
                  key={h}
                  className={`px-3 py-2.5 font-bold border-b border-nut/10 ${i === 0 ? "rounded-tl-2xl" : ""
                    } ${i === 3 ? "rounded-tr-2xl" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-[#ecfdf0]/35 transition-colors"
              >
                <td
                  className="px-3 py-2 border-b border-nut/[0.08] font-semibold text-gray-800 truncate"
                  title={row.product}
                >
                  {row.product}
                </td>
                <td
                  className="px-3 py-2 border-b border-nut/[0.08] text-nut/70 truncate"
                  title={row.location}
                >
                  {row.location}
                </td>
                <td className="px-3 py-2 border-b border-nut/[0.08] font-bold text-nut tabular-nums whitespace-nowrap text-[11px] sm:text-xs">
                  {fmt(fromInr(row.totalInr))}
                </td>
                <td
                  className="px-3 py-2 border-b border-nut/[0.08] text-nut/65 truncate"
                  title={row.qty}
                >
                  {row.qty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function StatsDashboard() {
  const [counterTarget, setCounterTarget] = useState(20);
  const [currency, setCurrency] = useState("INR");
  const [orders, setOrders] = useState(CATALOG.slice(0, MAX_ROWS).map((o) => ({ ...o })));

  /* Counter: +1 every 20s */
  useEffect(() => {
    const id = setInterval(() => {
      setCounterTarget((prev) => prev + 1);
    }, COUNTER_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  /* Table: prepend random order every 5 min */
  useEffect(() => {
    const id = setInterval(() => {
      const base = CATALOG[Math.floor(Math.random() * CATALOG.length)];
      setOrders((prev) => [{ ...base }, ...prev].slice(0, MAX_ROWS));
    }, TABLE_UPDATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Scoped styles — keyframes + custom classes that Tailwind can't express inline */}
      <style>{`
        .bento-card {
          background: #fff;
          border: 1px solid rgba(26, 107, 60, 0.14);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.8) inset,
            0 1px 2px rgba(15, 40, 25, 0.05);
          border-radius: 20px;
        }
        .stat-counter-num {
          font-size: clamp(3.75rem, min(22vmin, 11vw + 4rem), 7.25rem);
          line-height: 0.88;
          letter-spacing: -0.045em;
        }
        .text-nut { color: #1a6b3c; }
        .text-nut\\/55 { color: rgba(26,107,60,0.55); }
        .text-nut\\/65 { color: rgba(26,107,60,0.65); }
        .text-nut\\/70 { color: rgba(26,107,60,0.70); }
        .text-nut\\/80 { color: rgba(26,107,60,0.80); }
        .text-nut\\/38 { color: rgba(26,107,60,0.38); }
        .bg-nut { background-color: #1a6b3c; }
        .border-nut\\/10 { border-color: rgba(26,107,60,0.10); }
        .border-nut\\/12 { border-color: rgba(26,107,60,0.12); }
        .tabular-nums { font-variant-numeric: tabular-nums; }
        @keyframes counterPop {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-counter-pop {
          animation: counterPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 bg-white font-sans">
        <main className="w-full max-w-6xl mx-auto space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">

            {/* Counter */}
            <CounterCard target={counterTarget} />

            {/* Bar chart */}
            <WeeklyChart />

            {/* Orders table — with currency toggle inlined at top */}
            <section className="bento-card lg:col-span-12 p-4 sm:p-5">
              <div className="flex flex-row items-center justify-between gap-3 mb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] shrink-0" style={{ color: "rgba(26,107,60,0.55)" }}>
                  Recent <span style={{ color: "#1a6b3c" }}>({orders.length})</span>
                </h2>
                <CurrencyToggle currency={currency} onChange={setCurrency} />
              </div>
              <div className="rounded-2xl border bg-white" style={{ borderColor: "rgba(26,107,60,0.12)" }}>
                <table className="w-full table-fixed text-left text-xs sm:text-[13px] border-collapse">
                  <colgroup>
                    <col className="w-[32%]" />
                    <col className="w-[18%]" />
                    <col className="w-[28%]" />
                    <col className="w-[22%]" />
                  </colgroup>
                  <thead>
                    <tr style={{ backgroundColor: "rgba(236,253,240,0.45)", color: "rgba(26,107,60,0.8)" }}>
                      {["Product", "Location", "Total", "Qty"].map((h, i) => (
                        <th
                          key={h}
                          className={`px-3 py-2.5 font-bold border-b ${i === 0 ? "rounded-tl-2xl" : ""
                            } ${i === 3 ? "rounded-tr-2xl" : ""}`}
                          style={{ borderColor: "rgba(26,107,60,0.1)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((row, i) => {
                      const { fromInr, fmt } = CURRENCY_CONFIG[currency];
                      return (
                        <tr
                          key={i}
                          className="transition-colors"
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(236,253,240,0.35)")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                        >
                          <td
                            className="px-3 py-2 font-semibold text-gray-800 truncate border-b"
                            style={{ borderColor: "rgba(26,107,60,0.08)" }}
                            title={row.product}
                          >
                            {row.product}
                          </td>
                          <td
                            className="px-3 py-2 truncate border-b"
                            style={{ borderColor: "rgba(26,107,60,0.08)", color: "rgba(26,107,60,0.70)" }}
                            title={row.location}
                          >
                            {row.location}
                          </td>
                          <td
                            className="px-3 py-2 font-bold tabular-nums whitespace-nowrap text-[11px] sm:text-xs border-b"
                            style={{ borderColor: "rgba(26,107,60,0.08)", color: "#1a6b3c" }}
                          >
                            {fmt(fromInr(row.totalInr))}
                          </td>
                          <td
                            className="px-3 py-2 truncate border-b"
                            style={{ borderColor: "rgba(26,107,60,0.08)", color: "rgba(26,107,60,0.65)" }}
                            title={row.qty}
                          >
                            {row.qty}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <p
            className="text-center text-[11px] font-medium pt-1 leading-relaxed"
            style={{ color: "rgba(26,107,60,0.38)" }}
          >
            *Counter +1 every 20s · List refreshes every 5 min (max 4 rows)
          </p>
        </main>
      </div>
    </>
  );
}