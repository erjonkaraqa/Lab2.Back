const Product = require("../models/productModel");
const ProductCategory = require("../models/productCategoryModel");

exports.getAllProducts = async (req, res) => {
  const data = await Product.find();

  return res.status(200).json(data);
};

exports.getAllProductCategories = async (req, res) => {
  const categories = await ProductCategory.find();

  if (!categories) {
    return res.status(400).json({ message: "Cannot find categories" });
  }
  res.status(200).json(categories);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return;
  }

  return res.status(200).json(product);
};

exports.updateProduct = async (req, res, next) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return res.status(400).json({ message: "No document found with that ID" });
  }

  res.status(200).json(doc);
};

exports.createProductCategory = async (req, res, next) => {
  const category = await ProductCategory.create(req.body);

  if (!category) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  res.status(200).json(category);
};
