import { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import navData from "../data/navigation.json";

const { locations: LOCATIONS, roles } = navData;

export default function TopBar({ variant = "default" }) {
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

  const navigate = useNavigate();

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
      className={`fixed top-0 left-0 right-0 z-1000 bg-white/97 backdrop-blur-md border-b border-[#EAEAEA] transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Main nav */}
      <div className="flex items-center justify-start h-16 max-w-290 mx-auto px-6 gap-1">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0 no-underline">
          <span className="text-xl">🌿</span>

          <span
            className="text-xl font-black tracking-tight"
            style={{ color: "#141414", letterSpacing: "-0.3px" }}
          >
            Nutri<span style={{ color: "#2D7A4F" }}>tva</span>
          </span>
        </a>

        {/* Location */}
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
                color:
                  searchTerm || selectedLocation ? "#141414" : "#BBBBBB",
              }}
            />

            <ChevronDown
              size={18}
              className={`absolute right-0 pointer-events-none transition-transform duration-200 ${
                locationOpen ? "rotate-180" : ""
              }`}
              style={{ color: "#787878" }}
            />
          </div>

          {/* Dropdown */}
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
                    >
                      {city}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-6 text-center">
                  <div className="flex justify-center mb-2">
                    <AlertCircle size={22} className="text-[#D72C2C]" />
                  </div>

                  <p className="text-[13px] font-bold text-[#141414]">
                    We are not serviceable at this location
                  </p>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-auto">

          {/* Sign In */}
          <div ref={signInRef} className="relative">

            <button
              onClick={() => {
                setSignInRoleOpen((o) => !o);

                if (!signInRoleOpen) {
                  setSignUpRoleOpen(false);
                }
              }}
              className="inline-flex items-center gap-2 text-[14px] font-medium px-4 py-2 rounded-lg border-2 bg-transparent whitespace-nowrap"
              style={{
                color: "#383838",
                borderColor: "#2D7A4F",
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

            {signInRoleOpen && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg overflow-hidden py-1 min-w-35"
              >
                {roles.signIn.map((role) => (
                  <li key={role}>
                    <button
                      onClick={() => {
                        setSelectedSignInRole(role);
                        setSignInRoleOpen(false);

                        navigate(`/signup/${role.toLowerCase()}`);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#EFF7F2] hover:text-[#2D7A4F]"
                    >
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sign Up */}
          <div ref={signUpRef} className="relative">

            <button
              onClick={() => {
                setSignUpRoleOpen((o) => !o);

                if (!signUpRoleOpen) {
                  setSignInRoleOpen(false);
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-[14px] font-semibold text-white whitespace-nowrap"
              style={{
                background: "#2D7A4F",
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

            {signUpRoleOpen && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg overflow-hidden py-1 min-w-35"
              >
                {roles.signUp.map((role) => (
                  <li key={role}>
                    <button
                      onClick={() => {
                        setSelectedSignUpRole(role);
                        setSignUpRoleOpen(false);

                        navigate(`/signup/${role.toLowerCase()}`);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#EFF7F2] hover:text-[#2D7A4F]"
                    >
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.25 w-9 h-9 items-center justify-center ml-auto"
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          <span className="block w-5.5 h-0.5 bg-[#141414]" />
          <span className="block w-5.5 h-0.5 bg-[#141414]" />
          <span className="block w-5.5 h-0.5 bg-[#141414]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#EAEAEA] px-6 py-4">

          <div className="flex gap-3">

            <button
              onClick={() => setSignInRoleOpen((o) => !o)}
              className="flex-1 border-2 border-[#2D7A4F] text-[#2D7A4F] py-2 rounded-lg"
            >
              Sign in
            </button>

            <button
              onClick={() => setSignUpRoleOpen((o) => !o)}
              className="flex-1 bg-[#2D7A4F] text-white py-2 rounded-lg"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Sign In */}
          {signInRoleOpen && (
            <div className="mt-4">
              {roles.signIn.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedSignInRole(role);

                    navigate(`/signup/${role.toLowerCase()}`);
                  }}
                  className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-[#F5F5F5]"
                >
                  {role}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Sign Up */}
          {signUpRoleOpen && (
            <div className="mt-4">
              {roles.signUp.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedSignUpRole(role);

                    navigate(`/signup/${role.toLowerCase()}`);
                  }}
                  className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-[#F5F5F5]"
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-[#141414]/60 backdrop-blur-[8px]"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl p-10 max-w-[400px] w-full text-center">

        <button
          onClick={onClose}
          className="absolute top-6 right-6"
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

        <h3 className="text-2xl font-black text-[#141414] mb-3">
          {isServiceable ? "Serviceable!" : "Not Serviceable"}
        </h3>

        <p className="text-[#555] text-[15px] leading-relaxed mb-10">
          {isServiceable ? (
            <>
              Great news! We deliver to{" "}
              <span className="font-bold text-[#141414]">
                {location}
              </span>
            </>
          ) : (
            "We're sorry, but we don't deliver to this location yet."
          )}
        </p>

        {isServiceable ? (
          <button
            onClick={onSignIn}
            className="w-full bg-[#2D7A4F] text-white py-4 rounded-2xl font-bold"
          >
            Proceed to Sign In
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-[#141414] text-white py-4 rounded-2xl font-bold"
          >
            Got it, thanks
          </button>
        )}
      </div>
    </div>
  );
}