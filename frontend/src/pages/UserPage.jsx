import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

// Debounce hook to optimize search API calls
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const UserPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(""); // General error state
  const [searchError, setSearchError] = useState(""); // Specific search error

  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounced input

  // Fetch all products
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(""); // Reset error state
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (err) {
      setError("Error fetching products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Search products based on query
  const searchProducts = async (query) => {
    if (!query) {
      fetchProducts();
      return;
    }
    setIsLoading(true);
    setSearchError(""); // Reset search error state
    try {
      const response = await api.get(`/products/search?query=${query}`);
      setProducts(response.data.products);
    } catch (err) {
      setSearchError("No products found for this search.");
      console.error("Error searching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchProducts(debouncedSearchQuery);
    } else {
      fetchProducts();
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetchProducts(); // Initial fetch
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Explore Products</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products by name or category..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Error Messages */}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {searchError && (
        <div className="text-gray-500 text-center">{searchError}</div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-lg font-semibold">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
