import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    startDate: "",
    expiryDate: "",
    oldPrice: "",
    newPrice: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    const { oldPrice, newPrice, startDate, expiryDate } = productData;
    const parsedOldPrice = parseFloat(oldPrice);
    const parsedNewPrice = parseFloat(newPrice);

    // **Validation Checks**
    if (parsedOldPrice <= 0 || parsedNewPrice <= 0) {
      setError("Price values must be greater than zero.");
      setIsSubmitting(false);
      return;
    }

    if (parsedOldPrice <= parsedNewPrice) {
      setError("Old price must be greater than the new price.");
      setIsSubmitting(false);
      return;
    }

    if (new Date(startDate) >= new Date(expiryDate)) {
      setError("Expiry date must be later than start date.");
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post("/products", productData);
      setSuccessMessage("Product added successfully!");

      setProductData({
        name: "",
        description: "",
        category: "",
        startDate: "",
        expiryDate: "",
        oldPrice: "",
        newPrice: "",
        imageUrl: "",
      });

      setTimeout(() => navigate("/vendor"), 1500);
    } catch (err) {
      setError("Error adding product. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-45">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Product
      </h2>

      {/* Error & Success Messages */}
      {error && (
        <div className="text-red-600 text-sm bg-red-100 p-2 rounded mb-3">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="text-green-600 text-sm bg-green-100 p-2 rounded mb-3">
          {successMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
          required
          rows="3"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={productData.startDate}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="expiryDate"
            value={productData.expiryDate}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={productData.oldPrice}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="newPrice"
            placeholder="New Price"
            value={productData.newPrice}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={productData.imageUrl}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 text-white rounded-lg transition-all ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
