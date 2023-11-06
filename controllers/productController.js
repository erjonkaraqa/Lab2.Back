const Product = require("../models/productModel");
const ProductCategory = require("../models/productCategoryModel");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  console.log("req.files.images", req.files);
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  req.body.imageCover = `product-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    // .resize(185, 185)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.body.imageCover}`);

  req.body.images = [];
  // 2) Images
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.png`;

      await sharp(file.buffer)
        // .resize(185, 185)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(`public/img/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const price = parseFloat(req.body.price);
  const discount = parseFloat(req.body.discount);
  const stock = parseFloat(req.body.stock);

  const discountPercentage = discount || 0;
  const originalPrice = price;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const productData = {
    ...req.body,
    price,
    discount,
    stock,
    priceDiscount: discountedPrice,
  };

  const product = await Product.create(productData);

  if (!product) {
    return next(new AppError("Cant create product", 401));
  }

  res.status(200).json(product);
});

exports.getAllProducts = async (req, res) => {
  const data = await Product.find();

  return res.status(200).json(data);
};

exports.getAllProductCategories = catchAsync(async (req, res) => {
  const categories = await ProductCategory.find();

  if (!categories) {
    return res.status(400).json({ message: "Cannot find categories" });
  }
  res.status(200).json(categories);
});

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return;
  }

  return res.status(200).json(product);
};

exports.updateProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json(doc);
});

exports.createProductCategory = catchAsync(async (req, res, next) => {
  const category = await ProductCategory.create(req.body);

  if (!category) {
    return next(new AppError("Something went wrong!", 401));
  }

  res.status(200).json(category);
});
