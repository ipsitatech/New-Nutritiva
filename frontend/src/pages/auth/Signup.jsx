import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  buyerSignup,
  sellerSignup,
  guestSignup,
  saveSession,
} from "../../services/authService";
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
  ChevronDown,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import TermsModal from "../../components/ui/TermsModal";
import signupBg from "../../assets/product_imgs/dryfruits_falling.png";
import LeftPanel from "./components/LeftPanel.jsx";
import BuyerSignupForm from "./components/BuyerSignupForm.jsx";
import SellerSignupForm from "./components/SellerSignupForm.jsx";
import GuestSignupForm from "./components/GuestSignupForm.jsx";
import { CaptchaField, Checkbox } from "./components/SignupHelpers.jsx";

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
    countryCode: "+91",
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
    adhereQuality: false,
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
      countryCode: "+91",
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
      adhereQuality: false,
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFormData((prev) => ({ ...prev, tanCard: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const gstRegex = /^[A-Za-z0-9]{15}$/;
    const ifscRegex = /^[A-Za-z0-9]{11}$/;
    const bankAccountRegex = /^\d{9,18}$/;
    const addressRegex = /^[A-Za-z0-9\s,.-/#()]+$/;
    const captchaRegex = /^[A-Za-z0-9]+$/;

    if (isBuyer || isGuest) {
      const trimmedFullName = (formData.fullName || "").trim();
      if (!trimmedFullName) {
        return setApiError("Full Name is required.");
      }
      if (!nameRegex.test(trimmedFullName)) {
        return setApiError("Full Name should contain only characters.");
      }
    }

    if (isSeller) {
      const trimmedFirst = (formData.firstName || "").trim();
      const trimmedLast = (formData.lastName || "").trim();
      const trimmedBiz = (formData.businessName || "").trim();

      if (!trimmedFirst) return setApiError("First Name is required.");
      if (!nameRegex.test(trimmedFirst))
        return setApiError("First Name should contain only characters.");

      if (!trimmedLast) return setApiError("Last Name is required.");
      if (!nameRegex.test(trimmedLast))
        return setApiError("Last Name should contain only characters.");

      if (!trimmedBiz) return setApiError("Business/Brand Name is required.");
      if (!nameRegex.test(trimmedBiz))
        return setApiError(
          "Business Name should contain only characters and spaces.",
        );

      if (!formData.businessType)
        return setApiError("Please select a Business Type.");
      if (!formData.primaryCategory)
        return setApiError("Please select a Primary Category.");

      if (formData.gstNumber && !gstRegex.test(formData.gstNumber)) {
        return setApiError(
          "GST Number must be exactly 15 alphanumeric characters.",
        );
      }

      if (
        formData.bankAccount &&
        !bankAccountRegex.test(formData.bankAccount)
      ) {
        return setApiError("Bank Account must be between 9 and 18 digits.");
      }

      if (formData.ifscCode && !ifscRegex.test(formData.ifscCode)) {
        return setApiError(
          "IFSC Code must be exactly 11 alphanumeric characters.",
        );
      }

      if (!formData.tanCard) {
        return setApiError("TAN Card Scanned Copy is required.");
      }

      if (!formData.certifyAccuracy) {
        return setApiError(
          "Please certify that all business information is accurate.",
        );
      }

      if (!formData.adhereQuality) {
        return setApiError(
          "Please agree to Nutritva's quality standards and seller code of conduct.",
        );
      }
    }

    if (formData.phone && !phoneRegex.test(formData.phone)) {
      return setApiError("Phone number must be exactly 10 digits.");
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      return setApiError("Please enter a valid email address.");
    }

    if (!isGuest) {
      if (!formData.password) {
        return setApiError("Password is required.");
      }
      if (formData.password && !passwordRegex.test(formData.password)) {
        return setApiError(
          "Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number, and one special character.",
        );
      }
      if (!formData.confirmPassword) {
        return setApiError("Please confirm your password.");
      }
      if (formData.password !== formData.confirmPassword) {
        return setApiError("Passwords do not match.");
      }
    }

    const trimmedAddress = (formData.address || "").trim();
    if (!trimmedAddress) {
      return setApiError("Address is required.");
    }
    if (trimmedAddress.length > 500) {
      return setApiError("Address is too long (max 500 characters).");
    }
    if (!addressRegex.test(trimmedAddress)) {
      return setApiError("Address contains invalid special characters.");
    }

    if (!termsAccepted) {
      setApiError("Please accept the Terms & Conditions to continue.");
      setShowTermsModal(true);
      return;
    }

    const trimmedCaptcha = (formData.captchaInput || "").trim();
    if (!trimmedCaptcha) {
      return setApiError("Captcha is required.");
    }
    if (!captchaRegex.test(trimmedCaptcha)) {
      return setApiError("Captcha should contain only letters and numbers.");
    }
    if (trimmedCaptcha.toUpperCase() !== captchaCode) {
      setApiError("Invalid captcha. Please try again.");
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    try {
      if (isBuyer) {
        const data = await buyerSignup(formData);
        if (data.token) saveSession(data.token, "buyer");
      } else if (isSeller) {
        const data = await sellerSignup(formData, formData.tanCard);
        if (data.token) saveSession(data.token, "seller");
      } else if (isGuest) {
        const data = await guestSignup(formData);
        if (data.token) saveSession(data.token, "guest");
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
        <LeftPanel role={currentRole} bgImage={signupBg} />
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
                {isSeller &&
                  "Register your business and start selling on Nutritva."}
                {isGuest && "Fast checkout for your immediate needs."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {isGuest && (
                <GuestSignupForm
                  formData={formData}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  loading={isLoading}
                  error={apiError}
                />
              )}

              {isBuyer && (
                <BuyerSignupForm
                  formData={formData}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  loading={isLoading}
                  error={apiError}
                />
              )}

              {isSeller && (
                <SellerSignupForm
                  formData={formData}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  loading={isLoading}
                  error={apiError}
                  tanCardFile={formData.tanCard}
                  onTanCardChange={handleFileChange}
                />
              )}

              <CaptchaField
                captchaCode={captchaCode}
                onRefresh={generateCaptcha}
                onChange={handleInputChange}
              />

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
                    <Checkbox
                      label="I certify all business information provided is accurate and compliant with applicable laws"
                      name="certifyAccuracy"
                      required
                      onChange={handleInputChange}
                    />
                    <Checkbox
                      label="I agree to adhere to Nutritva's quality standards and seller code of conduct"
                      name="adhereQuality"
                      required
                      onChange={handleInputChange}
                    />
                  </>
                )}

                {isBuyer && (
                  <Checkbox
                    label="Subscribe to promotional emails & updates"
                    name="promoEmails"
                    onChange={handleInputChange}
                  />
                )}
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
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
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
                {isSeller && (
                  <p className="text-center text-[12px] text-gray-400 mt-4">
                    Your application will be reviewed within 2-3 business days.
                  </p>
                )}
              </div>

              <p className="text-center text-[14px] text-gray-400 pb-10">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#2D7A4F] font-semibold hover:underline underline-offset-2"
                >
                  Sign in
                </Link>
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
