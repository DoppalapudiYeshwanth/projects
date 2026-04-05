const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const peopleSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["viewer", "analyst", "admin"],
    default: "viewer"
  },
  isActive: {
  type: Boolean,
  default: true
  }
}, { timestamps: true });

peopleSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

peopleSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("People", peopleSchema);