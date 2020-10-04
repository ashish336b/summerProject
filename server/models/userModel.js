const mongoose = require("mongoose");
const userModel = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String, default: "" },
    phoneNumber: { type: String },
    role: { type: String, enum: ["admin", "customer"], default: "admin" },
    password: { type: String },
    username: { type: String },

    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model("users", userModel);
