import { Check, X } from "lucide-react";

export default function PasswordRules({ password }) {
  if (password === undefined) return null;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[\W_]/.test(password);
  const hasMinLength = password.length >= 8;

  return (
    <div className="mt-2 space-y-1 text-[12px]">
      <div
        className={`flex items-center gap-2 ${
          hasMinLength ? "text-[#2D7A4F]" : "text-gray-400"
        }`}
      >
        {hasMinLength ? <Check size={14} /> : <X size={14} />}{" "}
        <span>Minimum 8 characters</span>
      </div>
      <div
        className={`flex items-center gap-2 ${
          hasUppercase ? "text-[#2D7A4F]" : "text-gray-400"
        }`}
      >
        {hasUppercase ? <Check size={14} /> : <X size={14} />}{" "}
        <span>One uppercase letter</span>
      </div>
      <div
        className={`flex items-center gap-2 ${
          hasLowercase ? "text-[#2D7A4F]" : "text-gray-400"
        }`}
      >
        {hasLowercase ? <Check size={14} /> : <X size={14} />}{" "}
        <span>One lowercase letter</span>
      </div>
      <div
        className={`flex items-center gap-2 ${
          hasNumber ? "text-[#2D7A4F]" : "text-gray-400"
        }`}
      >
        {hasNumber ? <Check size={14} /> : <X size={14} />}{" "}
        <span>One number</span>
      </div>
      <div
        className={`flex items-center gap-2 ${
          hasSpecial ? "text-[#2D7A4F]" : "text-gray-400"
        }`}
      >
        {hasSpecial ? <Check size={14} /> : <X size={14} />}{" "}
        <span>One special character</span>
      </div>
    </div>
  );
}
