const express = require("express");
const contractController = require("../controllers/contractController");
const router = express.Router();

router.post("/", contractController.insertEmployee);
router.post("/insertContract", contractController.insertContract);
router.get("/", contractController.findAllEmployees);
router.get("/contracts", contractController.findAllContracts);
router.get(
  "/basedOnStartDate/:startDate",
  contractController.findContractsBasedOnStartDate
);
router.get(
  "/basedOnEmployee/:id",
  contractController.findContractsBasedOnEmployee
);
router.get("/basedOnID/test/:id", contractController.getContractBasedOnID);
router.patch("/:id", contractController.updateContract);

module.exports = router;
