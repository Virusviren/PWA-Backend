const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  purchasedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  validTill: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: Number,
    required: true,
  },
  apartmentNumber: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("purchase", PurchaseSchema);
