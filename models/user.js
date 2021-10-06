const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model("User", UserSchema);
