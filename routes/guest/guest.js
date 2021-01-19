const express = require("express");
const router = express.Router();

const Insurance = require("../../models/Insurance");

// Get a list of all insurances in the system
router.get("/", async (req, res) => {
  try {
    const insurances = await Insurance.find().select("-updatedOn");

    res.json({ insurances });
  } catch (error) {
    res.status(400).json({
      msg:
        "An error occurred while getting all the insurances from the system. Please refresh the page.",
    });
  }
});

module.exports = router;
