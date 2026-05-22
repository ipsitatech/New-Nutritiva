import { useState, useEffect } from "react";
import NavLogo from "./NavLogo";
import LocationDropdown from "./LocationDropdown";
import AuthDropdown from "./AuthDropdown";
import StatusModal from "./StatusModal";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ variant }) {
  const [scrolled, setScrolled] = useState(false);
  const [serviceableModal, setServiceableModal] = useState(false);
  const [notServiceableModal, setNotServiceableModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

  // Scroll shadow
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-1000 bg-white/97 backdrop-blur-md border-b border-[#EAEAEA] transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="flex items-center justify-around h-22 max-w-290 mx-auto px-6 gap-1">
          <NavLogo />

          <LocationDropdown
            onServiceable={(city) => {
              setSelectedLocation(city);
              setServiceableModal(true);
            }}
            onNotServiceable={() => setNotServiceableModal(true)}
          />

          <AuthDropdown mobileMenuOpen={mobileMenuOpen} />

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors ml-auto"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-[#141414]" />
            ) : (
              <Menu size={24} className="text-[#141414]" />
            )}
          </button>
        </div>

        {/* AuthDropdown renders mobile menu content when `mobileMenuOpen` is true */}
      </nav>

      <StatusModal
        isOpen={serviceableModal}
        onClose={() => setServiceableModal(false)}
        type="serviceable"
        location={selectedLocation}
        onSignIn={() => {
          setServiceableModal(false);
          navigate("/signup/buyer");
        }}
      />

      <StatusModal
        isOpen={notServiceableModal}
        onClose={() => setNotServiceableModal(false)}
        type="not-serviceable"
      />
    </>
  );
}
