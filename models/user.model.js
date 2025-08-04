const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
