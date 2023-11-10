const ReturnRequest = require('../models/returnRequestModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const returnRequests = await ReturnRequest.find().populate(
    'productsDetails.product'
  );

  if (!returnRequests) {
    return next(new AppError('Error fetching return requests', 500));
  }
  res.status(200).json(returnRequests);
});

exports.findWithUser = catchAsync(async (req, res, next) => {
  const returnRequests = await ReturnRequest.find({
    userID: req.user._id,
  }).populate('productsDetails.product');

  if (!returnRequests) {
    return next(
      new AppError('Error fetching return requests for the user', 500)
    );
  }

  res.json(returnRequests);
});

exports.createOne = catchAsync(async (req, res, next) => {
  const newRequest = await ReturnRequest.create({
    ...req.body,
    userID: req.user.id,
  });
  if (!newRequest) {
    return next(new AppError('Error creating a return request', 400));
  }
  await newRequest.save();
  res.status(201).json(newRequest);
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const requestId = req.params.id;
  const updatedRequest = await ReturnRequest.findByIdAndUpdate(
    requestId,
    req.body,
    { new: true }
  );
  if (!updatedRequest) {
    return next(new AppError('Return request not found', 404));
  }
  res.status(200).json(updatedRequest);
});
