import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL params

  // Initial state with default values
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    deliveryAmount: "",
    imageUrl: "",
    startDate: "",
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [error, setError] = useState(""); // Error message state

  // Format date to YYYY-MM-DD
  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "";

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProductData({
          ...response.data,
          startDate: formatDate(response.data.startDate),
        });
      } catch (err) {
        setError("Failed to fetch product. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setIsSubmitting(true);

    // Basic validation
    if (
      !productData.name ||
      !productData.category ||
      Number(productData.oldPrice) <= 0 ||
      Number(productData.newPrice) <= 0
    ) {
      setError("Please fill all fields correctly.");
      setIsSubmitting(false);
      return;
    }

    try {
      await api.put(`/products/${id}`, productData);
      alert("Product updated successfully!");
      navigate("/admin"); // Redirect to Admin page
    } catch (err) {
      setError("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading spinner while fetching data
  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-25 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
      {error && (
        <div className="text-red-500 mb-4 text-center">{error}</div>
      )}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          value={productData.oldPrice}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="newPrice"
          placeholder="New Price"
          value={productData.newPrice}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="deliveryAmount"
          placeholder="Delivery Amount"
          value={productData.deliveryAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={productData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={productData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 text-white rounded ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
