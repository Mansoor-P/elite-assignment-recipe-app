const Product = require("../models/Product");

// Create Product (Admin)
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit Product (Admin & Vendor)
exports.editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && req.user.id !== product.vendorId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await product.update(updatedData);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// View Product
exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && req.user.id !== product.vendorId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// List all Products
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
