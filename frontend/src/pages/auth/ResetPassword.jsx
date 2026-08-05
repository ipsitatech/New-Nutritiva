import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasUppercase = /[A-Z]/.test(formData.newPassword);
  const hasLowercase = /[a-z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const hasSpecial = /[\W_]/.test(formData.newPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword: formData.newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      alert("Password reset successful");
      navigate("/signin/buyer");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="mt-3 space-y-1 text-[13px]">
            <div
              className={`flex items-center gap-2 ${hasUppercase ? "text-green-600" : "text-gray-500"}`}
            >
              {hasUppercase ? <Check size={14} /> : <X size={14} />}{" "}
              <span>One uppercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${hasLowercase ? "text-green-600" : "text-gray-500"}`}
            >
              {hasLowercase ? <Check size={14} /> : <X size={14} />}{" "}
              <span>One lowercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${hasNumber ? "text-green-600" : "text-gray-500"}`}
            >
              {hasNumber ? <Check size={14} /> : <X size={14} />}{" "}
              <span>One number</span>
            </div>
            <div
              className={`flex items-center gap-2 ${hasSpecial ? "text-green-600" : "text-gray-500"}`}
            >
              {hasSpecial ? <Check size={14} /> : <X size={14} />}{" "}
              <span>One special character</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              required
              className={`w-full border rounded-xl px-4 py-3 pr-12 ${
                formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formData.confirmPassword &&
            formData.newPassword !== formData.confirmPassword && (
              <p className="mt-2 text-[12px] text-red-500 flex items-center gap-1">
                <X size={14} /> Passwords do not match
              </p>
            )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2D7A4F] hover:bg-[#236340] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(45,122,79,0.15)]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
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
              Resetting...
            </span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
