var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const invoiceModel = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    invoiceNumber: { type: Number, default: 22 },
    discountAmt: { type: Number },
    item: { type: Array, default: [] },
    netTotal: { type: Number },
    grandTotal: { type: Number },
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
  }
);
autoIncrement.initialize(mongoose.connection);
invoiceModel.plugin(autoIncrement.plugin, {
  model: "invoices",
  field: "invoiceNumber",
});

module.exports = mongoose.model("invoices", invoiceModel);
