// src/services/authService.js
// Central API service for all authentication calls.
// All requests go to the backend at port 5000.

const BASE_URL = "http://localhost:5000/api/auth";

/**
 * Buyer Signup — sends JSON body.
 */
export async function buyerSignup(formData) {
  const body = {
    role: "buyer",
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    fullName: formData.fullName,
    address: formData.address,
    promoEmails: formData.promoEmails || false,
  };

  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Signup failed");
  return data;
}

/**
 * Seller Signup — sends multipart/form-data (required for TAN card file upload).
 */
export async function sellerSignup(formData, tanCardFile) {
  const body = new FormData();
  body.append("role", "seller");
  body.append("email", formData.email);
  body.append("phone", formData.phone);
  body.append("password", formData.password);
  body.append("firstName", formData.firstName);
  body.append("lastName", formData.lastName);
  body.append("businessName", formData.businessName);
  body.append("businessType", formData.businessType);
  body.append("primaryCategory", formData.primaryCategory);
  body.append("gstNumber", formData.gstNumber);
  body.append("address", formData.address);
  body.append("bankAccount", formData.bankAccount);
  body.append("ifscCode", formData.ifscCode);
  if (tanCardFile) body.append("tanCard", tanCardFile);

  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body, // No Content-Type header — browser sets it automatically with boundary
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Signup failed");
  return data;
}

/**
 * Sign In — both buyer and seller use same endpoint.
 * Returns { token, role, status }
 */
export async function signin(emailOrPhone, password) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrPhone, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Sign in failed");
  return data;
}

/**
 * Saves the JWT token to localStorage after successful sign in.
 */
export function saveSession(token, role) {
  localStorage.setItem("nutritva_token", token);
  localStorage.setItem("nutritva_role", role);
}

/**
 * Retrieves the current session token.
 */
export function getToken() {
  return localStorage.getItem("nutritva_token");
}

/**
 * Clears the session (logout).
 */
export function clearSession() {
  localStorage.removeItem("nutritva_token");
  localStorage.removeItem("nutritva_role");
}
