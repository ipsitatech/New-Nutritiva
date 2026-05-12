import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { signin, saveSession } from "../services/authService";
import {
  ArrowRight,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  RefreshCw,
  Trophy,
  Users,
  ChevronLeft,
  KeyRound,
  Timer,
  Eye,
  EyeOff
} from "lucide-react";
import TopBar from "../components/TopBar";
import signupBg from "../assets/product_imgs/dried_blueberries.png";

/* ─────────────────────────────────────────────
   REUSABLE FIELD COMPONENTS
───────────────────────────────────────────── */

function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] font-semibold tracking-wider uppercase text-gray-400 mb-1.5">
      {children}
    </label>
  );
}

function FormInput({ label, name, type = "text", placeholder, required, onChange, icon: Icon, value }) {
  return (
    <div className="flex flex-col flex-1">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <Icon size={15} />
          </span>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
          className={[
            "w-full bg-gray-50 border border-gray-200 rounded-xl",
            "text-[14px] font-medium text-gray-900 placeholder:text-gray-300",
            "focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5",
            "transition-all duration-200 py-3",
            Icon ? "pl-10 pr-4" : "px-4",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEFT PANEL (Same as Signup for branding)
───────────────────────────────────────────── */

function LeftPanel({ role }) {
  const content = {
    buyer: {
      tag: "Premium Dry Fruits",
      title: "Welcome back to Nutritva.",
      desc: "Log in to access your favorite superfoods and personalized deals.",
      stats: [],
      trust: ["Secure & encrypted access", "Personalized superfood deals"],
      icon: <Users size={20} className="text-[#6ee7a0]" />
    },
    seller: {
      tag: "Seller Portal",
      title: "Manage your business.",
      desc: "Access your dashboard to track sales and inventory.",
      stats: [],
      trust: ["Business-grade security", "Real-time sales tracking"],
      icon: <Trophy size={20} className="text-[#6ee7a0]" />
    }
  }[role] || content.buyer;

  return (
    <div className="hidden lg:flex w-1/2 h-full flex-col relative overflow-hidden">
      <img src={signupBg} alt="Nutritva" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2e1a]/92 via-[#163d28]/88 to-[#0b2e1a]/95" />
      <div className="relative z-10 flex flex-col h-full px-16 py-16 justify-center">
        <div>
          <p className="text-[12px] font-semibold tracking-wider uppercase text-[#6ee7a0]/60 mb-6">{content.tag}</p>
          <h2 className="text-[48px] font-black text-white leading-tight tracking-tight mb-6">{content.title}</h2>
          <p className="text-[16px] text-white/40 leading-relaxed max-w-[320px] mb-10">{content.desc}</p>
          
          <div className="flex flex-col gap-4">
            {content.trust.map((text) => (
              <div key={text} className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#6ee7a0]/40 flex-shrink-0" />
                <span className="text-[14px] text-white/30 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function SignIn() {
  const { role: urlRole } = useParams();
  const navigate = useNavigate();

  const currentRole = urlRole?.toLowerCase() || "buyer";

  const [view, setView] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    forgotPhone: "",
    otp: ""
  });

  useEffect(() => {
    setFormData({
      emailOrPhone: "",
      password: "",
      forgotPhone: "",
      otp: ""
    });
    setView("signin");
    setShowPassword(false);
  }, [currentRole]);

  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setIsLoading(true);
    try {
      const data = await signin(formData.emailOrPhone, formData.password);
      saveSession(data.token, data.role);
      // Navigate based on role
      if (data.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setView("otp");
    setTimer(300);
    setTimerActive(true);
    console.log("Sending OTP to:", formData.forgotPhone);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", formData.otp);
    // Reset or navigate to reset password page
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white font-['DM_Sans',sans-serif]">
      <TopBar />

      <main className="flex flex-1 overflow-hidden pt-16">
        <LeftPanel role={currentRole} />

        <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white scrollbar-hide">
          <div className="w-full max-w-xl mx-auto px-8 md:px-16 py-12 lg:py-20">
            
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-[36px] lg:text-[42px] font-black text-gray-900 tracking-tight leading-none mb-3">
                {view === 'signin' && "Welcome back"}
                {view === 'forgot-password' && "Reset security"}
                {view === 'otp' && "Verification"}
              </h1>
              <p className="text-[15px] text-gray-400 max-w-sm mx-auto lg:mx-0">
                {view === 'signin' && `Sign in to your ${currentRole} account.`}
                {view === 'forgot-password' && "Enter your phone to receive an OTP."}
                {view === 'otp' && `Enter the code sent to your phone.`}
              </p>
            </div>

            {/* Forms */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              {view === 'signin' && (
                <form onSubmit={handleSignInSubmit} className="flex flex-col gap-5">
                  <FormInput 
                    label="Email or Phone" 
                    name="emailOrPhone" 
                    placeholder="Enter your credentials" 
                    required 
                    onChange={handleInputChange} 
                    icon={Mail} 
                  />
                  <div>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                        <Lock size={15} />
                      </span>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5 transition-all duration-200 py-3.5 pl-10 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button 
                        type="button"
                        onClick={() => setView('forgot-password')}
                        className="text-[12px] font-semibold text-gray-400 hover:text-[#2D7A4F] transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {apiError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium px-4 py-3 rounded-xl">
                      {apiError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#2D7A4F] hover:bg-[#236340] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(45,122,79,0.15)] mt-2"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {view === 'forgot-password' && (
                <form onSubmit={handleForgotSubmit} className="flex flex-col gap-6">
                  <FormInput 
                    label="Registered Phone Number" 
                    name="forgotPhone" 
                    placeholder="+91 00000 00000" 
                    required 
                    onChange={handleInputChange} 
                    icon={Phone} 
                  />
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#2D7A4F] hover:bg-[#256040] text-white text-[15px] font-bold py-4 rounded-xl transition-all duration-200">
                    Send OTP
                    <KeyRound size={18} />
                  </button>
                </form>
              )}

              {view === 'otp' && (
                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6">
                  <div>
                    <FieldLabel>Enter 6-Digit OTP</FieldLabel>
                    <div className="flex gap-2">
                      <input
                        name="otp"
                        type="text"
                        maxLength="6"
                        placeholder="0 0 0 0 0 0"
                        required
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl text-center text-[20px] font-black tracking-widest text-gray-900 placeholder:text-gray-200 focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5 transition-all duration-200 py-4"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-gray-400 text-[13px] font-medium">
                      <Timer size={14} className={timer < 60 ? "text-red-400" : "text-[#2D7A4F]"} />
                      Expires in: <span className={`font-bold ${timer < 60 ? "text-red-400" : "text-gray-900"}`}>{formatTime(timer)}</span>
                    </div>
                    <button 
                      type="button"
                      disabled={timer > 0}
                      onClick={() => {
                        setTimer(300);
                        setTimerActive(true);
                      }}
                      className={`text-[12px] font-bold uppercase tracking-wider ${timer > 0 ? "text-gray-300 cursor-not-allowed" : "text-[#2D7A4F] hover:underline"}`}
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#2D7A4F] hover:bg-[#256040] text-white text-[15px] font-bold py-4 rounded-xl transition-all duration-200">
                    Verify & Proceed
                    <ShieldCheck size={18} />
                  </button>
                </form>
              )}
            </div>

            <p className="text-center text-[14px] text-gray-400 mt-10">
              {view === 'signin' ? (
                <>
                  Don't have an account?{" "}
                  <Link to={`/signup/${currentRole}`} className="text-[#2D7A4F] font-semibold hover:underline underline-offset-2">Create one</Link>
                </>
              ) : (
                <>
                  Remembered your password?{" "}
                  <button onClick={() => setView('signin')} className="text-[#2D7A4F] font-semibold hover:underline underline-offset-2">Sign in</button>
                </>
              )}
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}
