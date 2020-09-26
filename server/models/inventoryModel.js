const mongoose = require("mongoose");

const inventoryModel = new mongoose.Schema(
  {
    productName: { type: String },
    manufacturer: { type: String },
    expiryDate: { type: String },
    quantity: { type: Number },
    mrp: { type: String },
    cp: { type: String },
    unit: { type: String },
    space: { type: String },
    vendorId: { type: mongoose.Schema.ObjectId, ref: "vendor" },
    fractionalCC: { type: String },
    purchaseId: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    strict: false,
    timestamps: true,
  }
);

module.exports = Item = mongoose.model("inventories", inventoryModel);
