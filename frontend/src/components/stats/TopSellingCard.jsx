import Card from "./Card";
import { TOP_PRODUCTS } from "./statsData";

export default function TopSellingCard() {
  return (
    <Card bg="bg-[#2F502D]" square>
      <div className="shrink-0 mb-2">
        <p className="text-[13px] font-bold text-white mt-2 mb-2">
          Top Selling Products
        </p>
        <div className="h-px bg-white/10" />
      </div>

      <ul className="flex flex-col flex-1 min-h-0 justify-around list-none">
        {TOP_PRODUCTS.map((p) => (
          <li
            key={p.name}
            className="flex items-center gap-2.5 px-1.5 py-1 rounded-xl hover:bg-white/8 transition-colors cursor-default"
          >
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
