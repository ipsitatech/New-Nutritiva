import Card from "./Card";
import { TODAY_STR, ACTIVE_ORDERS } from "./statsData";

export default function ActiveOrdersCard() {
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
