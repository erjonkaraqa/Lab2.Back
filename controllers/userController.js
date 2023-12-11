const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  console.log("newObj", newObj);
  return newObj;
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (!newUser) {
    return next(new AppError("Cannot create new user", 401));
  }

  res.status(200).json({
    success: "success",
    data: {
      user: newUser,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("Password should not be posted here", 400));
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "surname",
    "gender",
    "birthdate"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedUser);
});

exports.getUser = catchAsync(async (req, res, next) => {
  let query = await User.findById(req.params.id);

  // if (popOptions) query = query.populate(popOptions);
  const doc = query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
});
