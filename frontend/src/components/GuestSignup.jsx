export default function GuestSignup() {
  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-sm">
      {/* Heading */}
      <h1 className="text-5xl font-black text-[#141414] leading-tight">
        Continue as Guest
      </h1>

      <p className="mt-4 text-[18px] text-[#666]">
        Quick access without creating a full account.
      </p>

      {/* Form */}
      <div className="flex flex-col gap-4 mt-10">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />
      </div>

      {/* Terms */}
      <p className="text-[15px] text-[#666] mt-6">
        By continuing, you agree to{" "}
        <span className="text-[#2D7A4F] font-semibold cursor-pointer hover:underline">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="text-[#2D7A4F] font-semibold cursor-pointer hover:underline">
          Privacy Policy
        </span>
      </p>

      {/* Continue Button */}
      <button className="w-full bg-[#2D7A4F] hover:bg-[#256641] text-white py-5 rounded-2xl font-bold text-[18px] mt-8 transition-all">
        Continue →
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