import Card from "./Card";
import { TODAY_STR, TOTAL_PRODUCTS } from "./statsData";

export default function TotalProductsCard() {
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
