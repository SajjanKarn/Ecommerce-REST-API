const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model("Order", OrderSchema);
