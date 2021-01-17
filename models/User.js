const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "User",
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
