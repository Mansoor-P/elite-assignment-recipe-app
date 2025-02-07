import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // Error state for handling API errors

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details. Please try again.");
        console.error("Error fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  // Calculate discount percentage
  const discountPercentage =
    product.oldPrice && product.newPrice
      ? ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
      : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{product.name}</h2>

      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.imageUrl || "/fallback-image.jpg"} // Use fallback image if missing
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
        />

        <div className="md:ml-6 mt-4 md:mt-0 flex-1">
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <p className="text-lg">
              Price:{" "}
              <span className="text-gray-500 line-through">
                ${product.oldPrice?.toFixed(2)}
              </span>{" "}
              →{" "}
              <span className="text-green-600 font-semibold">
                ${product.newPrice?.toFixed(2)}
              </span>
            </p>
            {discountPercentage > 0 && (
              <span className="inline-block bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                {discountPercentage.toFixed(0)}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-700">
            <strong>Expires on:</strong>{" "}
            {product.expiryDate
              ? new Date(product.expiryDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Category:</strong> {product.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
