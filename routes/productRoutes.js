const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/categories", productController.getAllProductCategories);
router.get("/:id", productController.getProduct);
router.post("/createProductCategory", productController.createProductCategory);

module.exports = router;
