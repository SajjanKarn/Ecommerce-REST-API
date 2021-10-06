const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});

module.exports = new mongoose.model("Category", CategorySchema);
