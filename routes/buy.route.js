const express = require("express");
const router = express.Router();
const Notification = require("../models/notification.model");

router.post("/buy", async (req, res) => {
  try {
    const { userName, productName, quantity } = req.body;

    // Example: store purchase in DB (optional)

    const message = `🛍️ ${userName} bought ${quantity} x ${productName}`;

    const notification = new Notification({ message });
    await notification.save();

    res.status(200).json({ message: "Purchase successful. Admin notified." });
  } catch (err) {
    res.status(500).json({ message: "Error processing purchase", error: err.message });
  }
});

module.exports = router;
