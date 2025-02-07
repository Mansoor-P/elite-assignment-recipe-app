import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || "/"; // Redirect to homepage after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      const { token, role } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      navigate(role === "admin" ? "/admin" : redirectTo);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 5000); // Auto-clear error after 5s
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, type, name, value, onChange, required }) => (
  <div>
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={`Enter your ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

export default Login;
