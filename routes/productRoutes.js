const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();
router.get("/relatedProducts/:id", productController.findRelatedProducts);
router.get("/", productController.getAllProducts);
router.get("/categories", productController.getAllProductCategories);
router.get("/:id", productController.getProduct);
router.post(
  "/createProductCategory",
  authController.protect,
  authController.restrictTo("admin"),
  productController.createProductCategory
);
router.post(
  "/createProduct",
  productController.uploadProductImages,
  productController.resizeProductImages,
  authController.protect,
  authController.restrictTo("admin"),
  productController.createProduct
);
router.patch(
  "/:id",
  productController.uploadProductImages,
  productController.resizeProductImages,
  authController.protect,
  authController.restrictTo("admin"),
  productController.updateProduct
);

module.exports = router;
