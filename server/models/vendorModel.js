const mongoose = require("mongoose");

const vendorModel = new mongoose.Schema(
  {
    vendorName: { type: String },
    phoneNumber: { type: String },
    panNumber: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model("vendor", vendorModel);
