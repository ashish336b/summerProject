const mongoose = require("mongoose");

const inventoryModel = new mongoose.Schema(
  {
    productName: { type: String },
    manufacturer: { type: String },
    quantity: { type: Number },
    mrp: { type: String },
    cp: { type: String },
    mrpAmount: { type: String },
    productSlug: { type: String },
    cpAmount: { type: String },
    unit: { type: String },
    space: { type: String },
    vendorId: { type: mongoose.Schema.ObjectId, ref: "vendor" },
    purchasedFrom: { type: String },
    purchaseId: { type: String },
    isDisplay: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    strict: false,
    timestamps: true,
  }
);

module.exports = Item = mongoose.model("inventories", inventoryModel);
