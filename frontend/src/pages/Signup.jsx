import { useParams } from "react-router-dom";

import TopBar from "../components/TopBar";

import BuyerSignup from "../components/BuyerSignup";
import SellerSignup from "../components/SellerSignup";
import GuestSignup from "../components/GuestSignup";

export default function Signup() {
  const { role } = useParams();

  return (
    <>
      <TopBar />

      <div className="min-h-screen bg-[#F8F8F8] pt-28 px-4 flex justify-center">
        {role === "buyer" && <BuyerSignup />}

        {role === "seller" && <SellerSignup />}

        {role === "guest" && <GuestSignup />}
      </div>
    </>
  );
}