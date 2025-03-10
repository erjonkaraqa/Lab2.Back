const { default: mongoose } = require("mongoose");

const contractSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
