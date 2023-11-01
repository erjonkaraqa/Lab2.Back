const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have title"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tfTransport: {
      type: Boolean,
      default: false,
    },
    warranty: {
      type: String,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image"],
    },
    images: [String],
    price: {
      type: "Number",
      required: [true, "A product must have a price"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: [true, "A product must have category"],
    },
    stock: {
      type: "Number",
      required: [true, "A product must have  stock"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val === null || val <= this.price;
        },
        message:
          "Discount price ({VALUE}) should be below or equal to regular price",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    tags: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.path("ratingsAverage").validate(function (value) {
  return value >= 1 && value <= 5;
}, "Rating must be between 1 and 5");

productSchema.path("price").validate(function (value) {
  return value >= 0;
}, "Price must be a non-negative value");

productSchema.path("stock").validate(function (value) {
  return value >= 0;
}, "Stock must be a non-negative value");

productSchema.index({ category: 1 });

productSchema.statics.findByCategory = function (categoryId) {
  return this.find({ category: categoryId });
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
