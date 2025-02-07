import React from "react";

const ProductCard = ({ product }) => {
  const {
    name,
    description,
    category,
    vendor,
    discountPercentage = 0,
    discountAmount = 0,
    expiryDate,
  } = product;

  const getFormattedExpiryTime = (date) => {
    if (!date) return "N/A";
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate !== "Invalid Date" ? formattedDate : "N/A";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transform transition duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {name || "Unnamed Product"}
      </h3>
      <p className="text-gray-700 mb-3">
        {description || "No description available."}
      </p>

      <p className="text-sm text-gray-500">
        <span className="font-semibold">Category:</span>{" "}
        {category || "Uncategorized"}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <span className="font-semibold">Vendor:</span>{" "}
        {vendor?.name ? (
          <>
            {vendor.name}{" "}
            <span className="text-blue-600">({vendor.email})</span>
          </>
        ) : (
          "Not available"
        )}
      </p>

      <p className="text-sm mt-2">
        {discountAmount > 0 ? (
          <span className="text-green-600 font-semibold">
            Discount: {discountPercentage}% (Save ${discountAmount})
          </span>
        ) : (
          <span className="text-red-600 font-semibold">
            No discount available
          </span>
        )}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <span className="font-semibold">Expiry Date:</span>{" "}
        {getFormattedExpiryTime(expiryDate)}
      </p>

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
