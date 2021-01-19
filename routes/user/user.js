const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// Add a new user to the system or return an existing user
router.post("/", async (req, res) => {
  const { fullName, email } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      res.json({
        user: userExists,
        msg: "User has already been added to the system.",
      });
    } else {
      let user = new User({
        fullName,
        email,
      });

      await user.save();

      res.json({
        user,
        msg: "User has been added successfully added to the system.",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg:
        "An error occurred while adding the user to the system. Please refresh the page.",
    });
  }
});

module.exports = router;
