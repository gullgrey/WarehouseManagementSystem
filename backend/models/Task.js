const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  intakeId: { type: String, required: true },
  productName: { type: String },
  productAmount: { type: String },
  description: { type: String },
  completed: { type: Boolean, default: false },
  storageRack: { type: String },
  shipmentId: { type: String },
  shipmentTime: { type: Date },
});

module.exports = mongoose.model("Task", taskSchema);
