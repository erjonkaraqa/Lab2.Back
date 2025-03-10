const { default: mongoose } = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
