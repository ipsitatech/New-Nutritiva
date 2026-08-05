import { ShieldCheck, Trophy, Users, RefreshCw } from "lucide-react";

const panelContent = {
  signup: {
    buyer: {
      tag: "Premium Dry Fruits",
      title: "Quality you can taste the difference.",
      desc: "Sourced from the world's finest farms, delivered fresh to your doorstep.",
      stats: [
        { val: "50K+", label: "Customers" },
        { val: "4.9", label: "Avg Rating" },
        { val: "200+", label: "Products" },
      ],
      trust: [
        "100% natural, no preservatives",
        "SSL encrypted & secure",
        "Same-day delivery",
      ],
      icon: <Users size={20} className="text-[#6ee7a0]" />,
    },
    seller: {
      tag: "Partner Program",
      title: "Grow your business with Nutritva.",
      desc: "Reach millions of premium customers and scale your brand nationwide.",
      stats: [
        { val: "1.5K+", label: "Active Sellers" },
        { val: "12%", label: "Avg Growth" },
        { val: "24/7", label: "Support" },
      ],
      trust: [
        "Weekly payouts guaranteed",
        "Advanced seller dashboard",
        "Dedicated account manager",
      ],
      icon: <Trophy size={20} className="text-[#6ee7a0]" />,
    },
    guest: {
      tag: "Quick Checkout",
      title: "Fast, Secure, Simple Shopping.",
      desc: "Experience premium quality dry fruits without the long registration process.",
      stats: [
        { val: "2 Min", label: "Checkout" },
        { val: "Safe", label: "Transaction" },
        { val: "Elite", label: "Quality" },
      ],
      trust: [
        "No permanent data storage",
        "Instant order tracking",
        "Guest-only exclusive deals",
      ],
      icon: <RefreshCw size={20} className="text-[#6ee7a0]" />,
    },
  },
  signin: {
    buyer: {
      tag: "Premium Dry Fruits",
      title: "Welcome back to Nutritva.",
      desc: "Log in to access your favorite superfoods and personalized deals.",
      stats: [],
      trust: ["Secure & encrypted access", "Personalized superfood deals"],
      icon: <Users size={20} className="text-[#6ee7a0]" />,
    },
    seller: {
      tag: "Seller Portal",
      title: "Manage your business.",
      desc: "Access your dashboard to track sales and inventory.",
      stats: [],
      trust: ["Business-grade security", "Real-time sales tracking"],
      icon: <Trophy size={20} className="text-[#6ee7a0]" />,
    },
  },
};

export default function LeftPanel({ role, page = "signup", bgImage }) {
  const content =
    panelContent[page]?.[role] ||
    panelContent[page]?.buyer ||
    panelContent.signup.buyer;

  return (
    <div className="hidden lg:flex w-1/2 h-full flex-col relative overflow-hidden">
      <img
        src={bgImage}
        alt="Nutritva"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2e1a]/92 via-[#163d28]/88 to-[#0b2e1a]/95" />
      <div className="relative z-10 flex flex-col h-full px-16 py-16 justify-between">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#6ee7a0]/60 mb-6">
            {content.tag}
          </p>
          <h2 className="text-[42px] font-black text-white leading-[1.1] tracking-tight mb-5">
            {content.title}
          </h2>
          <p className="text-[15px] text-white/35 leading-relaxed max-w-[320px]">
            {content.desc}
          </p>
          <div className="w-10 h-px bg-white/10 my-8" />
          <div className="flex gap-10">
            {content.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[24px] font-black text-white leading-none">
                  {s.val}
                </div>
                <div className="text-[12px] text-white/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {content.trust.map((text) => (
            <div key={text} className="flex items-center gap-3">
              <ShieldCheck
                size={14}
                className="text-[#6ee7a0]/50 flex-shrink-0"
              />
              <span className="text-[14px] text-white/30">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
