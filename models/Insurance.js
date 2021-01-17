const mongoose = require("mongoose");

const InsuranceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  insuranceName: {
    type: String,
    required: true,
  },
  companyLogoURL: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Decimal128,
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("insurance", InsuranceSchema);
