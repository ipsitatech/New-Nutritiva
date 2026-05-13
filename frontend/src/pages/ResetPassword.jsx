import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      alert("Password reset successful");

      navigate("/signin/buyer");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border rounded-xl px-4 py-3 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}