const express = require("express");
const authController = require("../controllers/authController");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.get(
  "/retrieve-session/:sessionId",
  authController.protect,
  paymentController.retrieveSession
);
router.post(
  "/checkout-session",
  authController.protect,
  paymentController.getCheckoutSession
);

module.exports = router;
