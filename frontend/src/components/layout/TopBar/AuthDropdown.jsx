import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import navData from "../../../data/navigation.json";

const { roles } = navData;

export default function AuthDropdown({ mobileMenuOpen }) {
  const [signInRoleOpen, setSignInRoleOpen] = useState(false);
  const [signUpRoleOpen, setSignUpRoleOpen] = useState(false);

  const [selectedSignInRole, setSelectedSignInRole] = useState("");
  const [selectedSignUpRole, setSelectedSignUpRole] = useState("");

  const signInRef = useRef(null);
  const signUpRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
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

  return (
    <>
      <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-auto">
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
            Sign in
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${signInRoleOpen ? "rotate-180" : ""}`}
            />
          </button>

          {signInRoleOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg overflow-hidden py-1 min-w-35">
              {roles.signIn.map((role) => (
                <li key={role}>
                  <button
                    onClick={() => {
                      setSelectedSignInRole(role);
                      setSignInRoleOpen(false);

                      navigate(`/signin/${role.toLowerCase()}`);
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
            Sign up
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${signUpRoleOpen ? "rotate-180" : ""}`}
            />
          </button>

          {signUpRoleOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg overflow-hidden py-1 min-w-35">
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

      {/* Mobile Menu Content */}
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

          {signInRoleOpen && (
            <div className="mt-4">
              {roles.signIn.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedSignInRole(role);

                    navigate(`/signin/${role.toLowerCase()}`);
                  }}
                  className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-[#F5F5F5]"
                >
                  {role}
                </button>
              ))}
            </div>
          )}

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
    </>
  );
}
