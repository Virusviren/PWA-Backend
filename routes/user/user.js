const express = require("express");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const admins = require("../../utilities/admins");

const User = require("../../models/User");
const Purchase = require("../../models/Purchase");

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

// Buy insurances (confirm and pay)
router.post("/buy", async (req, res) => {
  const purchasedOn = moment().format("MM-DD-YYYY");

  let purchaseDate = moment().format("MM-DD-YYYY");
  let expiryYear = (
    parseInt(purchaseDate.slice(purchaseDate.length - 4, purchaseDate.length)) +
    1
  ).toString();
  let validTill = purchaseDate.slice(0, purchaseDate.length - 4) + expiryYear;

  const transactionId = uuidv4().slice(0, 11).toUpperCase();

  const {
    email,
    items,
    fullName,
    mobileNumber,
    passportNumber,
    age,
    gender,
    streetName,
    buildingNumber,
    apartmentNumber,
    postalCode,
    city,
    region,
    total,
  } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (!userExists) {
      res.status(400).json({ msg: "No such user found." });
    } else {
      if (!admins.includes(email)) {
        let purchase = new Purchase({
          email,
          items,
          fullName,
          mobileNumber,
          passportNumber,
          age,
          gender,
          streetName,
          buildingNumber,
          apartmentNumber,
          postalCode,
          city,
          region,
          total,
          transactionId,
          purchasedOn,
          validTill,
        });

        await purchase.save();

        res.json({
          purchase,
          msg:
            "Thank you for using our service. Your purchase has been successful.",
        });
      } else {
        res.status(400).json({
          msg: "You are not authorized to perform this action.",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "An error occurred while purchasing. Please try again.",
    });
  }
});

// Get a list of all previous purchases
router.get("/", async (req, res) => {
  const { email } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      if (!admins.includes(email)) {
        const purchases = await Purchase.find({});

        res.json({ purchases });
      } else {
        res.status(400).json({
          msg: "You are not authorized to perform this action.",
        });
      }
    } else {
      res.status(400).json({
        msg: "No such user found.",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg:
        "An error occurred while getting all the previous purchases from the system. Please refresh the page.",
    });
  }
});

module.exports = router;
