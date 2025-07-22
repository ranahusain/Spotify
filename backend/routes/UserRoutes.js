const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UsersModel");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");

dotenv.config();

//SignUp
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    //hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    //save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    //generate the jwt token
    const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, {
      expiresIn: "2h",
    });

    // Add token and remove password before sending back
    newUser.token = token;
    newUser.password = undefined;

    //send the respone back
    res.status(200).json({
      success: true,
      token,
      user: newUser,
    });
  } catch (err) {
    console.error("Error while signing up:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//Login
router.post("/login", async (req, res) => {
  console.log("Inside Login Router");

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json("User Not Found");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;
      res.status(200).json({
        success: true,
        token,
        user,
      });
    }
  } catch (error) {
    console.error("Error while signing up:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//verify
router.get("/verify", auth, async (req, res) => {
  try {
    res.status(200).send("User is authenticated");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// routes/auth.js or similar
// routes/auth.js or similar
router.post("/google-login", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        role,
        password: "google-oauth", // dummy password
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "2h",
    });

    user.token = token;
    user.password = undefined;

    res.status(200).json({ success: true, user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
