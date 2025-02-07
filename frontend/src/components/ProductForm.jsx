import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, initialProduct = {}, categories = [] }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    newPrice: "",
    image: "",
    category: "",
    ...initialProduct,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProduct((prev) => ({ ...prev, ...initialProduct }));
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let message = "";
    if (name === "newPrice") {
      if (!value || isNaN(value) || Number(value) <= 0) {
        message = "Enter a valid price greater than zero.";
      }
    } else if (name === "category" && !value) {
      message = "Please select a category.";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !Object.values(errors).some((err) => err) &&
      product.name &&
      product.description &&
      product.newPrice &&
      product.category
    ) {
      onSubmit(product);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow-lg bg-white max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {initialProduct.id ? "Update Product" : "Add Product"}
      </h2>

      {/* Product Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className={`mt-2 p-2 w-full border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-blue-300`}
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">
          New Price ($) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="newPrice"
          value={product.newPrice}
          onChange={handleChange}
          className={`mt-2 p-2 w-full border ${
            errors.newPrice ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-blue-300`}
          min="0"
          step="0.01"
          required
        />
        {errors.newPrice && (
          <p className="text-red-500 text-sm">{errors.newPrice}</p>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className={`mt-2 p-2 w-full border ${
            errors.category ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-blue-300`}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      {/* Image Preview with Validation */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="mt-2 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
        />
        {product.image && (
          <img
            src={product.image}
            onError={(e) => (e.target.src = "/placeholder.png")}
            className="mt-2 w-full h-40 object-cover rounded-md shadow"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 mt-4 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-md transition"
      >
        {initialProduct.id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
