const mongoose = require("mongoose");
const purchasedItems = new mongoose.Schema(
  {
    productName: { type: String },
    manufacturer: { type: String },
    quantity: { type: Number },
    mrp: { type: String },
    cp: { type: String },
    unit: { type: String },
    space: { type: String },
    vendorId: { type: mongoose.Schema.ObjectId, ref: "vendor" },
    purchasedFrom: { type: String },
    purchaseId: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true }
);
const purchaseModel = new mongoose.Schema(
  {
    invoiceNumber: { type: String },
    vendorName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    panNumber: { type: String },
    isCredit: { type: Boolean },
    item: [purchasedItems],
    netTotal: { type: String },
    paidDate: { type: Date },
    isReturn: { type: Boolean, default: false },
    grandTotal: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model("purchase", purchaseModel);
