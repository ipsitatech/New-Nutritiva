import { useState } from "react";
import FieldLabel from "./FieldLabel.jsx";
import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  required,
  onChange,
  icon: Icon,
  maxLength,
  value,
}) {
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
          value={value ?? undefined}
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
