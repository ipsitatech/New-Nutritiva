import { useState, useRef, useEffect } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import navData from "../../../data/navigation.json";

const { locations: LOCATIONS } = navData;

export default function LocationDropdown({ onServiceable, onNotServiceable }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const locationRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLocations = LOCATIONS.filter((l) =>
    l.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      ref={locationRef}
      className="relative flex flex-col justify-center flex-1 max-w-[240px] px-3 h-full"
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
            color: searchTerm || selectedLocation ? "#141414" : "#BBBBBB",
          }}
        />

        <ChevronDown
          size={18}
          className={`absolute right-0 pointer-events-none transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`}
          style={{ color: "#787878" }}
        />
      </div>

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
                    localStorage.setItem("nutritva_location", city);
                    setSearchTerm("");
                    setLocationOpen(false);

                    if (onServiceable) onServiceable(city);
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
  );
}
