const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/create",
  roleMiddleware(["admin", "vendor"]), // Both admin and vendor can create products
  productController.createProduct
);

router.put(
  "/edit/:id",
  roleMiddleware(["admin", "vendor"]), // Admin and Vendor can edit
  productController.editProduct
);

router.get("/view/:id", productController.getProduct); // All users can view products

router.delete(
  "/delete/:id",
  roleMiddleware(["admin", "vendor"]), // Admin and Vendor can delete
  productController.deleteProduct
);

router.get(
  "/list",
  roleMiddleware(["admin", "vendor", "user"]),
  productController.getProducts
); // All users can list products

module.exports = router;
