const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "People"
  },
  amount: Number,
  type: {
    type: String,
    enum: ["income", "expense"]
  },
  category: String,
  date: {
    type: Date,
    default: Date.now
  },
  note: String
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);