const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model("Category", CategorySchema);
