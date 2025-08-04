const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  category: { type: String, enum: ["morning", "evening"], required: true },
  quantityOptions: [Number],
});

module.exports = mongoose.model("Food", foodSchema);
