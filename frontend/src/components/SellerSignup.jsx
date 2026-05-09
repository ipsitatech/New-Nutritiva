export default function SellerSignup() {
  return (
    <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-sm">
      {/* Heading */}
      <h1 className="text-5xl font-black text-[#141414] leading-tight">
        Create your account
      </h1>

      <p className="mt-4 text-[18px] text-[#666]">
        Join Nutritiva and start selling smarter. Grow your business with ease.
      </p>

      {/* Form */}
      <div className="flex flex-col gap-4 mt-10">
        <input
          type="text"
          placeholder="Seller Name"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="text"
          placeholder="Business / Store Name"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="email"
          placeholder="Business Email"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        <input
          type="text"
          placeholder="Warehouse / Shop Address"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        {/* City + Pincode */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
          />

          <input
            type="text"
            placeholder="Pincode"
            className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
          />
        </div>

        <input
          type="text"
          placeholder="GST Number"
          className="w-full border border-[#D9D9D9] rounded-2xl px-5 py-4 text-[16px] outline-none focus:border-[#2D7A4F] focus:ring-4 focus:ring-[#2D7A4F]/10 transition-all"
        />

        {/* GST Upload */}
        <div>
          <label className="block text-[15px] font-semibold text-[#141414] mb-2">
            Upload GST Certificate
          </label>

          <input
            type="file"
            className="w-full border border-dashed border-[#CFCFCF] rounded-2xl px-4 py-3 text-[15px] text-[#666] cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#EFF7F2] file:text-[#2D7A4F] file:font-semibold hover:file:bg-[#DDF1E5]"
          />
        </div>

        {/* PAN Upload */}
        <div>
          <label className="block text-[15px] font-semibold text-[#141414] mb-2">
            Upload PAN Card
          </label>

          <input
            type="file"
            className="w-full border border-dashed border-[#CFCFCF] rounded-2xl px-4 py-3 text-[15px] text-[#666] cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#EFF7F2] file:text-[#2D7A4F] file:font-semibold hover:file:bg-[#DDF1E5]"
          />
        </div>

        {/* Passwords */}
        <input
          type="password"
          placeholder="Create Password"
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
        <span className="text-[#2D7A4F] font-semibold cursor-pointer hover:underline">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="text-[#2D7A4F] font-semibold cursor-pointer hover:underline">
          Privacy Policy
        </span>
      </p>

      {/* Button */}
      <button className="w-full bg-[#2D7A4F] hover:bg-[#256641] text-white py-5 rounded-2xl font-bold text-[18px] mt-8 transition-all">
        Create My Account →
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