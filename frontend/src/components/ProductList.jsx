import React, { useEffect, useState } from "react";
import api from "../utils/api"; // Axios instance for API calls
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={fetchProducts}
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0)
    return <p className="text-center">No products available.</p>;

  return (
    <div className="product-list p-4">
      <h2 className="text-xl font-semibold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg shadow-md">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name || "Product Image"}
              className="w-full h-40 object-cover rounded-md"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">
              {product.newPrice
                ? `$${product.newPrice.toFixed(2)}`
                : "Price Not Available"}
            </p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
