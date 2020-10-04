var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const invoiceModel = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    invoiceNumber: { type: String, default: 22 },
    discountAmt: { type: String },
    item: { type: Array, default: [] },
    netTotal: { type: String },
    grandTotal: { type: String },
    deliveryCharge: { type: String },
    user: { type: Object, default: {} },
    panNumber: { type: String },
    isCredit: { type: Boolean, default: false },
    paidDate: { type: Date, default: null },
    date: { tyoe: Date, default: Date.now() },
    paymentMethod: {
      type: String,
      enum: ["cash", "cheque", "online", null],
      default: null,
    },
    //
    date: { type: Date, default: Date.now() },
    isReturn: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    strict: false,
    collation: { locale: "en_US", numericOrdering: true },
  }
);
autoIncrement.initialize(mongoose.connection);
invoiceModel.plugin(autoIncrement.plugin, {
  model: "invoices",
  field: "invoiceNumber",
});

module.exports = mongoose.model("invoices", invoiceModel);
