const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
    default: "Admin",
    required: true,
  },
});

module.exports = mongoose.model("admin", AdminSchema);
