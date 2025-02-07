import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import VendorPage from "./pages/VendorPage";
import UserPage from "./pages/UserPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import * as jwt_decode from "jwt-decode";

import "./App.css";
import "./index.css";
const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser(decoded);

        if (decoded.role === "admin") {
          navigate("/admin");
        } else if (decoded.role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/user");
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className=" min-h-screen bg-gray-100">
      <Navbar user={user} />
      <div className="box-border container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/create" element={<CreateProductPage />} />
          <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/vendor" element={<VendorPage />} />
          <Route
            path="/vendor/create-product"
            element={<CreateProductPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
