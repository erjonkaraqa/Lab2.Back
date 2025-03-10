// import Employee from "../models/employeeModel";

const Contract = require("../models/contractModel");
const Employee = require("../models/employeeModel");

exports.insertEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);

    return res.status(200).json(newEmployee);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.insertContract = async (req, res) => {
  try {
    const newContract = await Contract.create({
      ...req.body,
      startDate: new Date(req.body.startDate),
    });

    return res.status(200).json(newContract);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.findAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.findAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();

    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.findContractsBasedOnStartDate = async (req, res) => {
  try {
    // const startDateFilter = req.params.startDate || new Date().toISOString();
    // // const contracts = await Contract.find({
    // //   startDate: { $gte: new Date(startDateFilter) },
    // // });
    const startDate = new Date(decodeURIComponent(req.params.startDate));

    // const contracts = await Contract.find({
    //   startDate: {
    //     $gte: startDate,
    //     $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
    //   },
    // });

    const contracts = await Contract.find({
      startDate: "2023-12-11T00:00:00.000+00:00",
    });

    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getContractBasedOnID = async (req, res) => {
  try {
    const query = await Contract.find({ _id: req.params.id });

    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// exports.findContractsBasedOnStartDate = async (req, res) => {
//     try {
//       const dayOfMonth = req.query.dayOfMonth || new Date().getDate();
//       const monthOfYear = req.query.monthOfYear || new Date().getMonth() + 1; // Months are zero-based
//       const year = new Date().getFullYear();

//       const startDateFilter = new Date(`${year}-${monthOfYear}-${dayOfMonth}`);
//       const endDateFilter = new Date(`${year}-${monthOfYear}-${dayOfMonth + 1}`);

//       const contracts = await Contract.find({
//         startDate: { $gte: startDateFilter, $lt: endDateFilter },
//       });

//       return res.status(200).json(contracts);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   };
// router.get("/contracts", async (req, res) => {
//   try {
//     const startDateFilter = req.query.startDate || new Date().toISOString(); // Default to today's date if startDate is not provided in the query

//     const contracts = await Contract.find({
//       startDate: { $gte: new Date(startDateFilter) },
//     });

//     return res.status(200).json(contracts);
//   } catch (error) {
//     console.error("Error fetching contracts:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });
exports.findContractsBasedOnEmployee = async (req, res) => {
  try {
    const contracts = await Contract.find({ employeeID: req.params.id });

    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.updateContract = async (req, res) => {
  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    return res.status(200).json(updatedContract);
  } catch (error) {
    return res.status(500).json(error);
  }
};
