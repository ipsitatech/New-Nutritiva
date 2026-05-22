import Card from "./Card";
import { LOCATION_DATA } from "./statsData";
import { DateBadge } from "./QuickSalesCard";

export default function LocationCard() {
  return (
    <Card bg="bg-[#5B3F2F]" square>
      <div className="shrink-0 mb-2">
        <DateBadge />
        <p className="text-[9.5px] font-bold tracking-[0.1em] uppercase text-white/40 mt-2 mb-2">
          Orders by Location
        </p>
        <div className="h-px bg-white/10" />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <table className="w-full text-left border-collapse h-full">
          <thead className="shrink-0">
            <tr>
              <th className="pb-1.5 text-[10px] font-semibold text-white/35">
                Location
              </th>
              <th className="pb-1.5 text-[10px] font-semibold text-white/35 text-right">
                Orders
              </th>
            </tr>
          </thead>
          <tbody>
            {LOCATION_DATA.map((l, idx) => (
              <tr
                key={l.city}
                className={
                  idx !== LOCATION_DATA.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }
              >
                <td className="py-[5px] text-[11.5px] font-semibold text-white/80">
                  {l.city}
                </td>
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
