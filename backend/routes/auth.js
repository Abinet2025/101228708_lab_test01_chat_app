const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  try {
    const user = new User({ username, firstname, lastname, password });
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(400).send("Error creating user");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({ username: user.username });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

module.exports = router;