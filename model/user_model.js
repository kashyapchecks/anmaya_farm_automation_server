const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  notifications: { type: Array, required: false, default: [] },
  accessible_farms: { type: Array, required: false, default: [] },
});

module.exports = mongoose.model("users", UserSchema);
