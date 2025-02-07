const Product = require("../models/Product");

// Create Product (Admin & Vendor)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      category,
      vendorId: req.user.id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Edit Product (Admin & Vendor)
exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && req.user.id !== product.vendorId) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && req.user.id !== product.vendorId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// List Products with Pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ startDate: -1 });
    const totalProducts = await Product.countDocuments();

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get Vendor Products (Pagination)
exports.getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ vendorId })
      .skip(skip)
      .limit(limit)
      .sort({ startDate: -1 });
    const totalProducts = await Product.countDocuments({ vendorId });

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor products" });
  }
};

// Search Products by Name or Category
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
};

// Admin Updates Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Admin Deletes Product
exports.deleteProductAdmin = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Vendor Adds Product
exports.addProductVendor = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      oldPrice,
      newPrice,
      startDate,
      expiryDate,
    } = req.body;
    const vendorId = req.user.id;

    const newProduct = new Product({
      name,
      description,
      category,
      oldPrice,
      newPrice,
      startDate,
      expiryDate,
      vendorId,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

// Vendor Updates Product
exports.updateProductVendor = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
      vendor: req.user.id,
    });
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found or no permission" });

    Object.assign(product, req.body);
    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Vendor Deletes Product
exports.deleteProductVendor = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
      vendor: req.user.id,
    });
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found or no permission" });

    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
