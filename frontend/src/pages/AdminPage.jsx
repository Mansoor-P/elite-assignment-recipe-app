import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      setError(""); // Reset error before fetching
      const response = await api.get(`/products?page=${page}&limit=10`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []); // Only run on initial render

  const handleCreateProduct = () => navigate("/admin/create");

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      fetchProducts(page);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mt-20 mb-4">Admin Dashboard</h2>
      <button
        onClick={handleCreateProduct}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Product
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500">No products available.</p>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
