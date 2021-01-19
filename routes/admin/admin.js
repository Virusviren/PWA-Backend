const express = require("express");
const router = express.Router();
const moment = require("moment");
const admins = require("../../utilities/admins");

const User = require("../../models/User");
const Insurance = require("../../models/Insurance");

// Get a list of all insurances in the system
router.get("/:email", async (req, res) => {
  try {
    let userExists = await User.findOne({ email: req.params.email });

    if (userExists) {
      if (admins.includes(email)) {
        const insurances = await Insurance.find({});

        res.json({ insurances });
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
        "An error occurred while getting all the insurances from the system. Please refresh the page.",
    });
  }
});

// Add a new insurance to the system
router.post("/", async (req, res) => {
  const postedOn = moment();
  const updatedOn = moment();

  const {
    email,
    companyName,
    companyLogoURL,
    insuranceName,
    details,
    price,
    type,
  } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (!userExists) {
      res.status(400).json({ msg: "No such user found." });
    } else {
      if (admins.includes(email)) {
        let insurance = new Insurance({
          companyName,
          companyLogoURL,
          insuranceName,
          details,
          price,
          type,
          postedOn,
          updatedOn,
        });

        await insurance.save();

        res.json({
          insurance,
          msg: "Insurance has been added successfully to the system.",
        });
      } else {
        res.status(400).json({
          msg: "You are not authorized to perform this action.",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg:
        "An error occurred while adding the insurance to the system. Please try again.",
    });
  }
});

// Update an insurance's details
router.patch("/:insuranceId", async (req, res) => {
  const updatedOn = moment();

  const {
    email,
    companyName,
    companyLogoURL,
    insuranceName,
    details,
    price,
    type,
  } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (!userExists) {
      res.status(400).json({ msg: "No such user found." });
    } else {
      if (admins.includes(email)) {
        let insurance = await Insurance.findById(req.params.insuranceId);

        if (!insurance) {
          res.status(400).json({
            msg: "No such insurance exists.",
          });
        } else {
          let newInsurance = {
            companyName,
            companyLogoURL,
            insuranceName,
            details,
            price,
            type,
            updatedOn,
          };

          newInsurance = await Insurance.findByIdAndUpdate(
            req.params.insuranceId,
            { $set: newInsurance },
            { new: true }
          );

          res.json({
            insurance: newInsurance,
            msg: "Insurance has been updated successfully in the system.",
          });
        }
      } else {
        res.status(400).json({
          msg: "You are not authorized to perform this action.",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg:
        "An error occurred while updating the insurance in the system. Please try again.",
    });
  }
});

// Delete an insurance from the system
router.delete("/:insuranceId", async (req, res) => {
  const { email } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (!userExists) {
      res.status(400).json({ msg: "No such user found." });
    } else {
      if (admins.includes(email)) {
        let insurance = await Insurance.findById(req.params.insuranceId);

        if (!insurance) {
          res.status(400).json({
            msg: "No such insurance exists.",
          });
        } else {
          await Insurance.findByIdAndRemove(req.params.insuranceId);

          res.json({
            msg: "Insurance has been deleted successfully from the system.",
          });
        }
      } else {
        res.status(400).json({
          msg: "You are not authorized to perform this action.",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg:
        "An error occurred while deleting the insurance from the system. Please try again.",
    });
  }
});

module.exports = router;
