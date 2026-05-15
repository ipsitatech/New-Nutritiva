import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

// Import product images
import almonds from "../assets/product_imgs/almonds.png";
import walnuts from "../assets/product_imgs/walnuts.png";
import cashews from "../assets/product_imgs/mixed_dryfruit.png"; // Using mixed for cashews as proxy
import pistachios from "../assets/product_imgs/pistachios.png";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const NUT_DATA = [
  { name: "Pista",   orders: 36, kg: 210, color: "#355533" },
  { name: "Cashews", orders: 30, kg: 280, color: "#233F28" },
  { name: "Walnuts", orders: 20, kg: 320,  color: "#815F35" },
  { name: "Almond",  orders: 40, kg: 500, color: "#5B3E31" },
];

const TOP_PRODUCTS = [
  { name: "Premium Almonds",  qty: "500 kg", img: almonds },
  { name: "Kashmiri Walnuts", qty: "320 kg", img: walnuts },
  { name: "Roasted Cashews",  qty: "280 kg", img: cashews },
  { name: "Pistachios",       qty: "210 kg", img: pistachios },
];

/* ─────────────────────────────────────────────
   SOLID ROUNDED BAR
───────────────────────────────────────────── */

function SolidBar(props) {
  const { x, y, width, height, color } = props;
  if (!height || height <= 0) return null;
  const r = Math.min(10, width / 2);
  return (
    <rect
      x={x} y={y} width={width} height={height}
      rx={r} ry={r}
      fill={color}
    />
  );
}

/* ─────────────────────────────────────────────
   TOP SELLING PRODUCTS CARD
───────────────────────────────────────────── */

function TopProductCard() {
  return (
    <div className="sd-card sd-top-card">
      <div className="sd-top-header">
        <h2 className="sd-top-title">Top Selling Products</h2>
      </div>
      <ul className="sd-product-list">
        {TOP_PRODUCTS.map((p) => (
          <li key={p.name} className="sd-product-row">
            <div className="sd-product-icon">
              <img src={p.img} alt={p.name} className="w-10 h-10 object-cover rounded-md" />
            </div>
            <span className="sd-product-row-name">{p.name}</span>
            <span className="sd-product-row-qty">{p.qty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BAR CHART CARD
───────────────────────────────────────────── */

function NutBarChart() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className="sd-card sd-chart-card">
      <div className="sd-chart-header">
        <span className="sd-date-label">{dateStr}</span>
      </div>
      <div className="sd-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={NUT_DATA}
            margin={{ top: 32, right: 20, left: 20, bottom: 8 }}
            barCategoryGap="12%"
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: "rgba(45,122,79,0.15)" }}
              tick={{ fill: "#141414", fontSize: 13, fontFamily: "inherit", fontWeight: 600 }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={false}
              width={32}
              label={{
                value: "Orders Placed",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "rgba(20,20,20,0.4)",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "inherit",
                  textAnchor: "middle",
                },
              }}
            />
            <Bar
              dataKey="orders"
              shape={(props) => (
                <SolidBar {...props} color={NUT_DATA[props.index]?.color ?? "#2D7A4F"} />
              )}
              isAnimationActive={true}
            >
              {NUT_DATA.map((_, i) => <Cell key={i} />)}
              <LabelList
                dataKey="orders"
                position="top"
                style={{ fill: "#141414", fontSize: 13, fontWeight: 800, fontFamily: "inherit" }}
              />
              <LabelList
                dataKey="kg"
                position="insideBottom"
                offset={14}
                formatter={(v) => `${v} kg`}
                style={{ fill: "rgba(255,255,255,0.92)", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */

export default function StatsDashboard() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .sd-root {
          width: 100%;
          background: #eff7f2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .sd-shell {
          width: 100%;
          max-width: 290; /* Tailwind max-w-290 equivalent or handled by className */
        }

        .sd-top-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr);
          gap: 20px;
          align-items: stretch;
        }

        @media (max-width: 900px) {
          .sd-top-row { grid-template-columns: 1fr; }
        }

        /* ── Card base ── */
        .sd-card {
          background: #ffffff;
          border: 1px solid rgba(45,122,79,0.1);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          min-width: 0;
        }

        /* ── Top Selling Card ── */
        .sd-top-card {
          display: flex;
          flex-direction: column;
        }

        .sd-top-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(45,122,79,0.08);
          flex-shrink: 0;
        }

        .sd-top-title {
          font-size: 16px;
          font-weight: 800;
          color: #141414;
          letter-spacing: -0.02em;
        }

        .sd-product-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .sd-product-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(45,122,79,0.05);
          transition: background 0.2s;
          min-width: 0;
        }

        .sd-product-row:last-child {
          border-bottom: none;
        }

        .sd-product-row:hover {
          background: #eff7f2;
        }

        .sd-product-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9f7;
          border-radius: 14px;
          border: 1px solid rgba(45,122,79,0.1);
          overflow: hidden;
        }

        .sd-product-row-name {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          color: #141414;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .sd-product-row-qty {
          font-size: 13px;
          font-weight: 700;
          color: #2D7A4F;
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
        }

        /* ── Bar Chart Card ── */
        .sd-chart-card {
          display: flex;
          flex-direction: column;
          padding: 20px 12px 12px;
        }

        .sd-chart-header {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
          flex-shrink: 0;
        }

        .sd-date-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #2D7A4F;
          background: #eff7f2;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .sd-chart-wrap {
          flex: 1;
          height: 200px; /* Reduced height */
          min-width: 0;
        }

        @media (max-width: 600px) {
          .sd-chart-wrap { height: 180px; }
        }
      `}</style>

      <div className="sd-root">
        <div className="sd-shell max-w-290 mx-auto px-6">
          <div className="sd-top-row">
            <TopProductCard />
            <NutBarChart />
          </div>
        </div>
      </div>
    </>
  );
}