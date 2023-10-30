const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A view must have name"],
  },
});

const View = new mongoose.Model("View", viewSchema);

module.exports = View;
