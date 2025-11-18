const express = require("express");
const Subscriber = require("../models/Subscriber");

const router = express.Router();

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    // Create new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    // Respond with success message
    res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
  } catch (error) {
    console.error(error);
    // Respond with error message
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
