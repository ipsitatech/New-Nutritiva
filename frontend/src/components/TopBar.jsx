import { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, X } from "lucide-react";

import navData from "../data/navigation.json";

const { locations: LOCATIONS, roles } = navData;


export default function TopBar() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signInRoleOpen, setSignInRoleOpen] = useState(false);
  const [signUpRoleOpen, setSignUpRoleOpen] = useState(false);
  const [selectedSignInRole, setSelectedSignInRole] = useState("");
  const [selectedSignUpRole, setSelectedSignUpRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceableModal, setServiceableModal] = useState(false);
  const [notServiceableModal, setNotServiceableModal] = useState(false);

  const locationRef = useRef(null);
  const signInRef = useRef(null);
  const signUpRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
      if (signInRef.current && !signInRef.current.contains(e.target)) {
        setSignInRoleOpen(false);
      }
      if (signUpRef.current && !signUpRef.current.contains(e.target)) {
        setSignUpRoleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll shadow
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredLocations = LOCATIONS.filter((l) =>
    l.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 bg-white/97 backdrop-blur-md border-b border-[#EAEAEA] transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Main nav inner ── */}
      <div className="flex items-center justify-start h-16 max-w-290 mx-auto px-6 gap-1">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 no-underline">
          <span className="text-xl">🌿</span>
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: "#141414", letterSpacing: "-0.3px" }}
          >
            Nutri<span style={{ color: "#2D7A4F" }}>tva</span>
          </span>
        </a>

        {/* Deliver to — location picker */}
        <div
          ref={locationRef}
          className="relative flex flex-col justify-center shrink-0 pl-4 min-w-40 h-full ml-3"
        >
          <span
            className="text-[10px] font-semibold uppercase leading-none mb-1"
            style={{ color: "#787878" }}
          >
            Deliver to
          </span>

          {/* Input field that acts as search trigger */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!locationOpen) setLocationOpen(true);
              }}
              onFocus={() => setLocationOpen(true)}
              placeholder={selectedLocation || "Select location"}
              className="w-full border-none outline-none bg-white text-[13px] font-semibold pr-6 py-0 pl-0"
              style={{
                color: searchTerm || selectedLocation ? "#141414" : "#BBBBBB",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <ChevronDown
              size={18}
              className={`absolute right-0 pointer-events-none shrink-0 transition-transform duration-200 ${
                locationOpen ? "rotate-180" : ""
              }`}
              style={{ color: "#787878" }}
            />
          </div>

          {/* Dropdown list */}
          {locationOpen && (
            <ul
              className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg z-1100 overflow-hidden py-1 min-w-48"
              style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
            >
              {filteredLocations.length > 0 ? (
                filteredLocations.map((city) => (
                  <li key={city}>
                    <button
                      onClick={() => {
                        setSelectedLocation(city);
                        setSearchTerm("");
                        setLocationOpen(false);
                        setServiceableModal(true);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                        selectedLocation === city
                          ? "bg-[#EFF7F2] text-[#2D7A4F] font-semibold"
                          : "text-[#383838] hover:bg-[#EFF7F2] hover:text-[#2D7A4F]"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {selectedLocation === city && (
                        <span className="mr-2 text-[#2D7A4F]">✓</span>
                      )}
                      {city}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-6 text-center">
                  <div className="flex justify-center mb-2">
                    <AlertCircle size={22} className="text-[#D72C2C]" />
                  </div>
                  <p className="text-[13px] font-bold text-[#141414] leading-tight">
                    We are not serviceable at this location
                  </p>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Auth actions — pushed to right */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-auto">
          {/* Sign in with role dropdown */}
          <div ref={signInRef} className="relative">
            <button
              onClick={() => {
                setSignInRoleOpen((o) => !o);
                if (!signInRoleOpen) setSignUpRoleOpen(false);
              }}
              className="inline-flex items-center gap-2 text-[14px] font-medium px-4 py-2.25 rounded-lg border-2 bg-transparent whitespace-nowrap transition-all duration-200"
              style={{
                color: "#383838",
                borderColor: "#2D7A4F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#2D7A4F";
                e.currentTarget.style.background = "#EFF7F2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#383838";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Sign in {selectedSignInRole && `(${selectedSignInRole})`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  signInRoleOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sign in dropdown menu */}
            {signInRoleOpen && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg z-1100 overflow-hidden py-1 min-w-35"
                style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
              >
                {roles.signIn.map((role) => (
                  <li key={role}>
                    <button
                      onClick={() => {
                        setSelectedSignInRole(role);
                        setSignInRoleOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                        selectedSignInRole === role
                          ? "bg-[#EFF7F2] text-[#2D7A4F] font-semibold"
                          : "text-[#383838] hover:bg-[#EFF7F2] hover:text-[#2D7A4F]"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {selectedSignInRole === role && (
                        <span className="mr-2 text-[#2D7A4F]">✓</span>
                      )}
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sign up with role dropdown */}
          <div ref={signUpRef} className="relative">
            <button
              onClick={() => {
                setSignUpRoleOpen((o) => !o);
                if (!signUpRoleOpen) setSignInRoleOpen(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.25 rounded-lg text-[14px] font-semibold text-white whitespace-nowrap transition-all duration-200"
              style={{
                background: "#2D7A4F",
                border: "2px solid #2D7A4F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2D7A4F";
                e.currentTarget.style.borderColor = "#2D7A4F";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(45,122,79,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2D7A4F";
                e.currentTarget.style.borderColor = "#2D7A4F";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Sign up {selectedSignUpRole && `(${selectedSignUpRole})`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  signUpRoleOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sign up dropdown menu */}
            {signUpRoleOpen && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg z-1100 overflow-hidden py-1 min-w-35"
                style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
              >
                {roles.signUp.map((role) => (
                  <li key={role}>
                    <button
                      onClick={() => {
                        setSelectedSignUpRole(role);
                        setSignUpRoleOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                        selectedSignUpRole === role
                          ? "bg-[#EFF7F2] text-[#2D7A4F] font-semibold"
                          : "text-[#383838] hover:bg-[#EFF7F2] hover:text-[#2D7A4F]"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {selectedSignUpRole === role && (
                        <span className="mr-2 text-[#2D7A4F]">✓</span>
                      )}
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.25 w-9 h-9 items-center justify-center ml-auto shrink-0"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5.5 h-0.5 bg-[#141414] rounded-sm transition-transform duration-200 ${
              mobileMenuOpen ? "translate-y-1.75 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5.5 h-0.5 bg-[#141414] rounded-sm transition-opacity duration-200 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5.5 h-0.5 bg-[#141414] rounded-sm transition-transform duration-200 ${
              mobileMenuOpen ? "-translate-y-1.75 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden flex-col bg-white border-t border-[#EAEAEA] overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "flex max-h-96" : "hidden max-h-0"
        }`}
      >
        {/* Mobile location picker */}
        <div className="px-6 py-3 border-b border-[#EAEAEA]">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.8px] mb-1"
            style={{ color: "#787878" }}
          >
            Deliver to
          </p>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full text-[14px] font-medium outline-none border-none bg-white"
            style={{
              color: selectedLocation ? "#141414" : "#BBBBBB",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <option value="" disabled>
              Select location
            </option>
            {LOCATIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 px-6 py-4">
          <button
            onClick={() => {
              setSignInRoleOpen((o) => !o);
              if (!signInRoleOpen) setSignUpRoleOpen(false);
            }}
            className="flex-1 text-center text-[14px] font-medium py-2.5 rounded-lg border-2 transition-colors"
            style={{ borderColor: "#2D7A4F", color: "#2D7A4F" }}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setSignUpRoleOpen((o) => !o);
              if (!signUpRoleOpen) setSignInRoleOpen(false);
            }}
            className="flex-1 text-center text-[14px] font-semibold py-2.5 rounded-lg text-white transition-colors"
            style={{ background: "#2D7A4F" }}
          >
            Sign up
          </button>
        </div>

        {/* Mobile Sign In Roles Dropdown */}
        {signInRoleOpen && (
          <div className="px-6 pb-3 border-t border-[#EAEAEA]">
            <p
              className="text-[12px] font-semibold mb-2"
              style={{ color: "#787878" }}
            >
              Sign in as
            </p>
            <div className="flex flex-col gap-2">
              {roles.signIn.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedSignInRole(role);
                    setSignInRoleOpen(false);
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    selectedSignInRole === role
                      ? "bg-[#EFF7F2] text-[#2D7A4F] font-semibold"
                      : "text-[#383838] bg-[#F5F5F5]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Sign Up Roles Dropdown */}
        {signUpRoleOpen && (
          <div className="px-6 pb-3 border-t border-[#EAEAEA]">
            <p
              className="text-[12px] font-semibold mb-2"
              style={{ color: "#787878" }}
            >
              Sign up as
            </p>
            <div className="flex flex-col gap-2">
              {roles.signUp.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedSignUpRole(role);
                    setSignUpRoleOpen(false);
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    selectedSignUpRole === role
                      ? "bg-[#EFF7F2] text-[#2D7A4F] font-semibold"
                      : "text-[#383838] bg-[#F5F5F5]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <StatusModal
        isOpen={serviceableModal}
        onClose={() => setServiceableModal(false)}
        type="serviceable"
        location={selectedLocation}
        onSignIn={() => {
          setServiceableModal(false);
          setSignInRoleOpen(true);
        }}
      />
      <StatusModal
        isOpen={notServiceableModal}
        onClose={() => setNotServiceableModal(false)}
        type="not-serviceable"
      />
    </nav>
  );
}

function StatusModal({ isOpen, onClose, type, location, onSignIn }) {
  // Auto-close after 20 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const isServiceable = type === "serviceable";

  return (
    <div className="fixed inset-0 w-screen h-screen z-[10000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#141414]/60 backdrop-blur-[8px] transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.3)] p-10 max-w-[400px] w-full text-center animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 ease-out"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 text-[#787878] hover:bg-[#F5F5F5] hover:text-[#141414] rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div
          className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8 ${
            isServiceable ? "bg-[#EFF7F2]" : "bg-[#FFF2F2]"
          }`}
        >
          {isServiceable ? (
            <CheckCircle2 size={40} className="text-[#2D7A4F]" />
          ) : (
            <AlertCircle size={40} className="text-[#D72C2C]" />
          )}
        </div>

        <h3 className="text-2xl font-black text-[#141414] mb-3 tracking-tight">
          {isServiceable ? "Serviceable!" : "Not Serviceable"}
        </h3>

        <p className="text-[#555] text-[15px] leading-relaxed mb-10">
          {isServiceable ? (
            <>
              Great news! We deliver to <span className="font-bold text-[#141414]">{location}</span>. 
              You're all set to experience premium nutrition.
            </>
          ) : (
            "We're sorry, but we don't deliver to this location yet. We're expanding rapidly – stay tuned for updates!"
          )}
        </p>

        {isServiceable ? (
          <button
            onClick={onSignIn}
            className="w-full bg-[#2D7A4F] text-white py-4 rounded-2xl font-bold text-[16px] hover:bg-[#256641] hover:translate-y-[-2px] shadow-[0_8px_20px_rgba(45,122,79,0.3)] transition-all active:scale-[0.98]"
          >
            Proceed to Sign In
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-[#141414] text-white py-4 rounded-2xl font-bold text-[16px] hover:bg-black hover:translate-y-[-2px] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all active:scale-[0.98]"
          >
            Got it, thanks
          </button>
        )}
      </div>
    </div>
  );
}

