import ActiveOrdersCard from "./ActiveOrdersCard";
import TotalProductsCard from "./TotalProductsCard";
import TopSellingCard from "./TopSellingCard";
import QuickSalesCard from "./QuickSalesCard";
import LocationCard from "./LocationCard";

export default function StatsDashboard() {
  return (
    <div className="min-h-1/2 w-full bg-[#f0f2ef] flex items-center justify-center px-4 md:px-8 lg:px-10 py-10 font-['DM_Sans',sans-serif]">
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
