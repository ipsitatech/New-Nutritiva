import almondImg from "../../assets/product_imgs/almonds.png";
import walnutImg from "../../assets/product_imgs/walnuts.png";
import cashewImg from "../../assets/product_imgs/cashews_bowl.png";
import pistachioImg from "../../assets/product_imgs/pistachios.png";

export const today = new Date();
export const fmt = (d) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
export const TODAY_STR = fmt(today);

export const ORDERS_DATA = (() => {
  const base = [124, 98, 152, 116, 178, 143, 195];
  return base.map((v, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return {
      day: d.toLocaleDateString("en-GB", { weekday: "short" }),
      orders: v,
    };
  });
})();

export const ACTIVE_ORDERS = 142;
export const TOTAL_PRODUCTS = 38;

export const LOCATION_DATA = [
  { city: "Mumbai", orders: 154 },
  { city: "Delhi", orders: 138 },
  { city: "Bangalore", orders: 127 },
  { city: "Hyderabad", orders: 112 },
  { city: "Chennai", orders: 98 },
  { city: "Pune", orders: 84 },
  { city: "Ahmedabad", orders: 67 },
  { city: "Kolkata", orders: 54 },
];

export const TOP_PRODUCTS = [
  { name: "Premium Almonds", qty: "500 kg", img: almondImg },
  { name: "Kashmiri Walnuts", qty: "320 kg", img: walnutImg },
  { name: "Roasted Cashews", qty: "280 kg", img: cashewImg },
  { name: "Pistachios", qty: "210 kg", img: pistachioImg },
];
