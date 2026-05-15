import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { buyerSignup, sellerSignup, guestSignup, saveSession } from "../services/authService";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Building,
  FileText,
  Landmark,
  ShieldCheck,
  RefreshCw,
  Upload,
  X,
  FileCheck,
  Trophy,
  Users,
  CheckCircle2,
  Check,
  Eye,
  EyeOff,
  ChevronDown
} from "lucide-react";
import TopBar from "../components/TopBar";
import TermsModal from "../components/TermsModal";
import signupBg from "../assets/product_imgs/dryfruits_falling.png";

/* ─────────────────────────────────────────────
   REUSABLE FIELD COMPONENTS
───────────────────────────────────────────── */

function PasswordRules({ password }) {
  if (password === undefined) return null;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[\W_]/.test(password);

  return (
    <div className="mt-2 space-y-1 text-[12px]">
      <div className={`flex items-center gap-2 ${hasUppercase ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>
        {hasUppercase ? <Check size={14} /> : <X size={14} />} <span>One uppercase letter</span>
      </div>
      <div className={`flex items-center gap-2 ${hasLowercase ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>
        {hasLowercase ? <Check size={14} /> : <X size={14} />} <span>One lowercase letter</span>
      </div>
      <div className={`flex items-center gap-2 ${hasNumber ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>
        {hasNumber ? <Check size={14} /> : <X size={14} />} <span>One number</span>
      </div>
      <div className={`flex items-center gap-2 ${hasSpecial ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>
        {hasSpecial ? <Check size={14} /> : <X size={14} />} <span>One special character</span>
      </div>
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function FormInput({ label, name, type = "text", placeholder, required, onChange, icon: Icon, maxLength }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col flex-1">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <Icon size={15} />
          </span>
        )}
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          maxLength={maxLength}
          className={[
            "w-full bg-gray-50 border border-gray-200 rounded-xl",
            "text-[14px] font-medium text-gray-900 placeholder:text-gray-300",
            "focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5",
            "transition-all duration-200 py-3",
            Icon ? "pl-10 pr-12" : "px-4 pr-12",
          ].join(" ")}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function FormSelect({ label, name, required, onChange, options, icon: Icon }) {
  return (
    <div className="flex flex-col flex-1">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <Icon size={15} />
          </span>
        )}
        <select
          name={name}
          required={required}
          onChange={onChange}
          className={[
            "w-full bg-gray-50 border border-gray-200 rounded-xl",
            "py-3 text-[14px] font-medium text-gray-900",
            "focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5",
            "transition-all duration-200 appearance-none cursor-pointer pr-10",
            Icon ? "pl-10" : "px-4"
          ].join(" ")}
        >
          <option value="">Select option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}

function Checkbox({ label, name, required, checked, onChange, onLabelClick, disabled }) {
  return (
    <div className="flex items-start gap-3 group">
      <input
        type="checkbox"
        name={name}
        required={required}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#2D7A4F] cursor-pointer flex-shrink-0 disabled:opacity-50"
      />
      <span className="text-[13px] text-gray-500 leading-snug">
        {onLabelClick ? (
          <>
            I agree to Nutritva's{" "}
            <button 
              type="button" 
              onClick={onLabelClick}
              className="text-[#2D7A4F] font-bold hover:underline"
            >
              Terms & Conditions
            </button>
          </>
        ) : label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </span>
    </div>
  );
}

// ✅ UPDATED FileUpload component with validation
function FileUpload({ label, required, onChange }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const validateFile = (file) => {
    if (!file) return true;

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];
    const allowedExtensions = [".pdf", ".xls", ".xlsx", ".csv"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setError("Invalid file type. Please upload PDF, Excel, or CSV files only.");
      return false;
    }

    // Check file size (max 2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB limit. Please upload a smaller file.");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setFileName(file.name);
      onChange(e);
    } else if (file) {
      // Reset the input value so the same invalid file can be selected again
      e.target.value = "";
      setFileName("");
      onChange({ target: { name: e.target.name, value: null } });
    }
  };

  return (
    <div className="flex flex-col">
      <FieldLabel required={required}>{label}</FieldLabel>
      <label className={`
        relative flex items-center gap-3 px-4 py-3
        bg-gray-50 border border-dashed rounded-xl
        cursor-pointer hover:border-[#2D7A4F] hover:bg-[#2D7A4F]/[0.02]
        transition-all duration-200 group
        ${error ? "border-red-400 bg-red-50/30" : "border-gray-200"}
      `}>
        <Upload size={15} className={`${error ? "text-red-400" : "text-gray-300 group-hover:text-[#2D7A4F]"} transition-colors flex-shrink-0`} />
        <span className={`text-[14px] font-medium truncate ${error ? "text-red-500" : "text-gray-300 group-hover:text-gray-500"} transition-colors`}>
          {fileName || "Click to upload file (PDF, Excel, CSV, max 2MB)"}
        </span>
        <input
          type="file"
          required={required}
          accept=".pdf,.xls,.xlsx,.csv,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

function CaptchaField({ captchaCode, onRefresh, onChange }) {
  return (
    <div className="flex flex-col">
      <FieldLabel required>Verify Captcha</FieldLabel>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 px-5 py-3 bg-[#2D7A4F]/[0.06] border border-dashed border-[#2D7A4F]/20 rounded-xl font-mono text-[15px] font-bold tracking-[0.22em] text-[#2D7A4F] select-none">
          {captchaCode}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="flex-shrink-0 p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 hover:text-[#2D7A4F] hover:border-[#2D7A4F]/30 transition-all duration-200"
        >
          <RefreshCw size={14} />
        </button>
        <input
          name="captchaInput"
          placeholder="Enter code"
          required
          onChange={onChange}
          className="
            flex-1 bg-gray-50 border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] font-medium text-gray-900 placeholder:text-gray-300 uppercase
            focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5
            transition-all duration-200
          "
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEFT PANEL
───────────────────────────────────────────── */

function LeftPanel({ role }) {
  const content = {
    buyer: {
      tag: "Premium Dry Fruits",
      title: "Quality you can taste the difference.",
      desc: "Sourced from the world's finest farms, delivered fresh to your doorstep.",
      stats: [
        { val: "50K+", label: "Customers" },
        { val: "4.9", label: "Avg Rating" },
        { val: "200+", label: "Products" },
      ],
      trust: ["100% natural, no preservatives", "SSL encrypted & secure", "Same-day delivery"],
      icon: <Users size={20} className="text-[#6ee7a0]" />
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
      trust: ["Weekly payouts guaranteed", "Advanced seller dashboard", "Dedicated account manager"],
      icon: <Trophy size={20} className="text-[#6ee7a0]" />
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
      trust: ["No permanent data storage", "Instant order tracking", "Guest-only exclusive deals"],
      icon: <RefreshCw size={20} className="text-[#6ee7a0]" />
    }
  }[role] || content.buyer;

  return (
    <div className="hidden lg:flex w-1/2 h-full flex-col relative overflow-hidden">
      <img src={signupBg} alt="Nutritva" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2e1a]/92 via-[#163d28]/88 to-[#0b2e1a]/95" />
      <div className="relative z-10 flex flex-col h-full px-16 py-16 justify-between">
        {/* Main copy */}
        <div>
          <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#6ee7a0]/60 mb-6">{content.tag}</p>
          <h2 className="text-[42px] font-black text-white leading-[1.1] tracking-tight mb-5">{content.title}</h2>
          <p className="text-[15px] text-white/35 leading-relaxed max-w-[320px]">{content.desc}</p>
          <div className="w-10 h-px bg-white/10 my-8" />
          <div className="flex gap-10">
            {content.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[24px] font-black text-white leading-none">{s.val}</div>
                <div className="text-[12px] text-white/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {content.trust.map((text) => (
            <div key={text} className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-[#6ee7a0]/50 flex-shrink-0" />
              <span className="text-[14px] text-white/30">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function Signup() {
  const { role: urlRole } = useParams();
  const navigate = useNavigate();

  const currentRole = urlRole?.toLowerCase() || "buyer";
  const isBuyer = currentRole === "buyer";
  const isSeller = currentRole === "seller";
  const isGuest = currentRole === "guest";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    captchaInput: "",
    acceptTerms: false,
    promoEmails: false,
    // Seller specific
    firstName: "",
    lastName: "",
    businessName: "",
    businessType: "",
    primaryCategory: "",
    gstNumber: "",
    bankAccount: "",
    ifscCode: "",
    tanCard: null,
    // Seller specific checkboxes
    certifyAccuracy: false,
    adhereQuality: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [captchaCode, setCaptchaCode] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      captchaInput: "",
      acceptTerms: false,
      promoEmails: false,
      firstName: "",
      lastName: "",
      businessName: "",
      businessType: "",
      primaryCategory: "",
      gstNumber: "",
      bankAccount: "",
      ifscCode: "",
      tanCard: null,
      certifyAccuracy: false,
      adhereQuality: false
    });
    setTermsAccepted(false);
    generateCaptcha();
  }, [currentRole]);

  const generateCaptcha = () => {
    setCaptchaCode(Math.random().toString(36).substring(2, 8).toUpperCase());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "acceptTerms" && !termsAccepted) {
      setShowTermsModal(true);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    // Store the actual File object for multipart upload
    const file = e.target.files[0] || null;
    setFormData((prev) => ({ ...prev, tanCard: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // --- FORM VALIDATION ---
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
    const gstRegex = /^[A-Za-z0-9]{15}$/;
    const ifscRegex = /^[A-Za-z0-9]{11}$/;
    const bankAccountRegex = /^\d{9,18}$/;

    if (formData.fullName && !nameRegex.test(formData.fullName)) {
      return setApiError("Full Name should contain only characters.");
    }
    if (formData.firstName && !nameRegex.test(formData.firstName)) {
      return setApiError("First Name should contain only characters.");
    }
    if (formData.lastName && !nameRegex.test(formData.lastName)) {
      return setApiError("Last Name should contain only characters.");
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      return setApiError("Phone number must be exactly 10 digits.");
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      return setApiError("Please enter a valid email address.");
    }

    if (!isGuest) {
      if (formData.password && !passwordRegex.test(formData.password)) {
        return setApiError("Password must contain at least one uppercase, one lowercase, one number, and one special character.");
      }
      if (formData.password !== formData.confirmPassword) {
        return setApiError("Passwords do not match.");
      }
    }

    if (isSeller) {
      if (formData.gstNumber && !gstRegex.test(formData.gstNumber)) {
        return setApiError("GST Number must be exactly 15 alphanumeric characters.");
      }
      if (formData.ifscCode && !ifscRegex.test(formData.ifscCode)) {
        return setApiError("IFSC Code must be exactly 11 alphanumeric characters.");
      }
      if (formData.bankAccount && !bankAccountRegex.test(formData.bankAccount)) {
        return setApiError("Bank Account must be between 9 and 18 digits.");
      }
    }

    if (!termsAccepted) {
      setShowTermsModal(true);
      return;
    }
    if (formData.captchaInput.toUpperCase() !== captchaCode) {
      setApiError("Invalid captcha. Please try again.");
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    try {
      if (isBuyer) {
        const data = await buyerSignup(formData);
        if(data.token) saveSession(data.token, "buyer");
      } else if (isSeller) {
        const data = await sellerSignup(formData, formData.tanCard);
        if(data.token) saveSession(data.token, "seller");
      } else if (isGuest) {
        const data = await guestSignup(formData);
        if(data.token) saveSession(data.token, "guest");
      }
      navigate("/");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <TopBar />

      <main className="flex flex-1 overflow-hidden pt-16">
        <LeftPanel role={currentRole} />

        <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white scrollbar-hide">
          <div className="w-full max-w-2xl mx-auto px-8 md:px-16 py-12 lg:py-20">

            <div className="mb-10">
              <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight mb-2">
                {isBuyer && "Create an account"}
                {isSeller && "Partner with us"}
                {isGuest && "Guest Checkout"}
              </h1>
              <p className="text-[15px] text-gray-400">
                {isBuyer && "Sign up to start shopping premium dry fruits."}
                {isSeller && "Register your business and start selling on Nutritva."}
                {isGuest && "Fast checkout for your immediate needs."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* ── GUEST FIELDS ── */}
              {isGuest && (
                <>
                  <FormInput label="Full Name" name="fullName" placeholder="John Doe" required onChange={handleInputChange} icon={User} />
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput label="Phone" name="phone" placeholder="+91 00000 00000" required onChange={handleInputChange} icon={Phone} maxLength={10} />
                    <FormInput label="Email" name="email" type="email" placeholder="you@example.com" required onChange={handleInputChange} icon={Mail} />
                  </div>
                  <FormInput label="Full Address" name="address" placeholder="Flat, Street, Area, City" required onChange={handleInputChange} icon={MapPin} />
                  
                </>
              )}

              {/* ── BUYER FIELDS ── */}
              {isBuyer && (
                <>
                  <FormInput label="Full Name" name="fullName" placeholder="John Doe" required onChange={handleInputChange} icon={User} />
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput label="Phone" name="phone" placeholder="+91 00000 00000" required onChange={handleInputChange} icon={Phone} maxLength={10} />
                    <FormInput label="Email" name="email" type="email" placeholder="you@example.com" required onChange={handleInputChange} icon={Mail} />
                  </div>
                  <div className="grid grid-cols-2 gap-5 items-start">
                    <div className="flex flex-col">
                      <FormInput label="Password" name="password" type="password" placeholder="••••••••" required onChange={handleInputChange} icon={Lock} />
                      <PasswordRules password={formData.password} />
                    </div>
                    <div className="flex flex-col">
                      <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" required onChange={handleInputChange} icon={Lock} />
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="mt-2 text-[12px] text-red-500 flex items-center gap-1">
                          <X size={14} /> Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>
                  <FormInput label="Full Address" name="address" placeholder="Flat, Street, Area, City" required onChange={handleInputChange} icon={MapPin} />
                </>
              )}

              {/* ── SELLER FIELDS ── */}
              {isSeller && (
                <>
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput label="First Name" name="firstName" placeholder="John" required onChange={handleInputChange} />
                    <FormInput label="Last Name" name="lastName" placeholder="Doe" required onChange={handleInputChange} />
                  </div>
                  <FormInput label="Business / Brand Name" name="businessName" placeholder="Green Valley Farms" required onChange={handleInputChange} icon={Building} />
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput label="Business Email" name="email" type="email" placeholder="contact@business.com" required onChange={handleInputChange} icon={Mail} />
                    <FormInput label="Business Phone" name="phone" placeholder="+91 00000 00000" required onChange={handleInputChange} icon={Phone} maxLength={10} />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <FormSelect label="Business Type" name="businessType" required onChange={handleInputChange} icon={Building} options={[{ label: "Manufacturer", value: "man" }, { label: "Wholesaler", value: "whole" }]} />
                    <FormSelect label="Primary Category" name="primaryCategory" required onChange={handleInputChange} icon={FileCheck} options={[{ label: "Dry Fruits", value: "df" }]} />
                  </div>
                  <FormInput label="GST Number" name="gstNumber" placeholder="22AAAAA0000A1Z5" required onChange={handleInputChange} icon={FileText} maxLength={15} />
                  <FormInput label="Business Address" name="address" placeholder="Full Registered Address" required onChange={handleInputChange} icon={MapPin} />
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput label="Bank Account Number" name="bankAccount" placeholder="000000000000" required onChange={handleInputChange} icon={Landmark} maxLength={18} />
                    <FormInput label="IFSC Code" name="ifscCode" placeholder="SBIN0001234" required onChange={handleInputChange} maxLength={11} />
                  </div>
                  <div className="grid grid-cols-2 gap-5 items-start">
                    <div className="flex flex-col">
                      <FormInput label="Password" name="password" type="password" placeholder="••••••••" required onChange={handleInputChange} icon={Lock} />
                      <PasswordRules password={formData.password} />
                    </div>
                    <div className="flex flex-col">
                      <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" required onChange={handleInputChange} icon={Lock} />
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="mt-2 text-[12px] text-red-500 flex items-center gap-1">
                          <X size={14} /> Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>
                  {/* UPDATED: Using the enhanced FileUpload component */}
                  <FileUpload label="Upload TAN Card Scanned Copy" required onChange={handleFileChange} />
                </>
              )}

              <CaptchaField captchaCode={captchaCode} onRefresh={generateCaptcha} onChange={handleInputChange} />

              <div className="flex flex-col gap-4 pt-2">
                <Checkbox 
                  name="acceptTerms" 
                  required 
                  checked={termsAccepted}
                  onLabelClick={() => setShowTermsModal(true)}
                  onChange={handleInputChange}
                />
                
                {isSeller && (
                  <>
                    <Checkbox label="I certify all business information provided is accurate and compliant with applicable laws" name="certifyAccuracy" required onChange={handleInputChange} />
                    <Checkbox label="I agree to adhere to Nutritva's quality standards and seller code of conduct" name="adhereQuality" required onChange={handleInputChange} />
                  </>
                )}
                
                {isBuyer && <Checkbox label="Subscribe to promotional emails & updates" name="promoEmails" onChange={handleInputChange} />}
              </div>

              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium px-4 py-3 rounded-xl">
                  {apiError}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D7A4F] hover:bg-[#256040] active:bg-[#1e4f35] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-bold py-4 rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(45,122,79,0.22)] hover:shadow-[0_6px_20px_rgba(45,122,79,0.32)]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      {isBuyer && "Create Account"}
                      {isSeller && "Submit Seller Application"}
                      {isGuest && "Continue as Guest"}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                {isSeller && <p className="text-center text-[12px] text-gray-400 mt-4">Your application will be reviewed within 2-3 business days.</p>}
              </div>

              <p className="text-center text-[14px] text-gray-400 pb-10">
                Already have an account?{" "}
                <Link to="/signin" className="text-[#2D7A4F] font-semibold hover:underline underline-offset-2">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
        onAccept={() => setTermsAccepted(true)} 
      />
    </div>
  );
}