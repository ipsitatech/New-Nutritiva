import { Link } from "react-router-dom";

export default function BuyerSignup() {
  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-sm">
      {/* Heading */}
      <h1 className="text-5xl font-black text-[#141414] leading-tight">
        Create your account
      </h1>

      <p className="mt-4 text-[18px] text-[#666]">
        Join Nutritiva and start shopping smarter.
      </p>

      {/* Name Fields */}
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />
      </div>

      {/* Other Fields */}
      <div className="flex flex-col gap-4 mt-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="text"
          placeholder="Pincode"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />
      </div>

      {/* Terms */}
      <p className="text-[15px] text-[#666] mt-6">
        Agree to{" "}
        <Link
          to="/terms"
          className="text-[#2D7A4F] font-semibold hover:underline"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="text-[#2D7A4F] font-semibold hover:underline"
        >
          Privacy Policy
        </Link>
      </p>

      {/* Create Button */}
      <button className="w-full bg-[#2D7A4F] hover:bg-[#256641] text-white py-5 rounded-2xl font-bold text-[18px] mt-8 transition-all">
        Create My Account →
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-[1px] bg-[#E5E5E5]" />

        <span className="text-[#888] text-[15px] whitespace-nowrap">
          or continue with
        </span>

        <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
      </div>

      {/* Google Button */}
      <button className="w-full border border-[#D9D9D9] rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-[#F8F8F8] transition-all">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="Google"
          className="w-6 h-6"
        />

        <span className="font-semibold text-[17px] text-[#141414]">
          Continue with Google
        </span>
      </button>

      {/* Sign In */}
      <p className="text-center text-[#666] text-[17px] mt-8">
        Already have an account?{" "}
        <span className="font-bold text-[#141414] cursor-pointer">
          Sign in
        </span>
      </p>
    </div>
  );
}