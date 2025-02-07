import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

const VendorPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    startDate: "",
    expiryDate: "",
    freeDelivery: false,
    deliveryAmount: "",
  });

  // Fetch vendor products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/products/vendor");
      setProducts(response.data.products);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newProduct.oldPrice <= 0 || newProduct.newPrice <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    if (new Date(newProduct.expiryDate) <= new Date(newProduct.startDate)) {
      setError("Expiry date must be later than start date.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/products/vendor", newProduct);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        category: "",
        oldPrice: "",
        newPrice: "",
        startDate: "",
        expiryDate: "",
        freeDelivery: false,
        deliveryAmount: "",
      });
    } catch (err) {
      setError("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/products/vendor/${productId}`);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-25">
      <h2 className="text-3xl font-bold text-center mb-6">
        Vendor - Manage Your Products
      </h2>

      {error && (
        <p className="text-red-500 text-center bg-red-100 p-2 rounded">
          {error}
        </p>
      )}

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded mt-4 p-6 max-w-3xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="oldPrice"
            value={newProduct.oldPrice}
            onChange={handleInputChange}
            placeholder="Old Price"
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="newPrice"
            value={newProduct.newPrice}
            onChange={handleInputChange}
            placeholder="New Price"
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="startDate"
            value={newProduct.startDate}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="expiryDate"
            value={newProduct.expiryDate}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          required
          className="border p-2 rounded w-full mt-4"
        />

        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            name="freeDelivery"
            checked={newProduct.freeDelivery}
            onChange={handleInputChange}
            className="mr-2"
          />
          Free Delivery
        </label>

        {newProduct.freeDelivery && (
          <input
            type="number"
            name="deliveryAmount"
            value={newProduct.deliveryAmount}
            onChange={handleInputChange}
            placeholder="Delivery Amount"
            className="border p-2 rounded w-full mt-2"
          />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      {isLoading ? (
        <p className="text-center mt-6">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded p-4 flex flex-col"
            >
              <ProductCard product={product} />
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorPage;
