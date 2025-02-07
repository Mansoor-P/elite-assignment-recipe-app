import React, { useState } from "react";
import api from "../utils/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await api.post("/auth/signup", formData);
      setMessage(response.data?.message || "Signup successful!");

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", response.data.role);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Error during signup:", err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 5000); // Auto-clear message after 5s
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-6 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl w-full flex flex-row-reverse">
        {/* Right Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNpZ251cHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Sign Up"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>

        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          {message && (
            <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg mb-4">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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

            {/* Role Selection */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 text-gray-700 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-lg transition-all duration-300 ease-in-out shadow-lg ${
                isLoading
                  ? "cursor-not-allowed bg-gray-400"
                  : "transform hover:scale-105 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
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
      className="w-full mt-1 px-4 py-3 text-gray-700 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

export default SignUp;
