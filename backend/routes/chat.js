const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Get messages for a room
router.get("/messages/:room", async (req, res) => {
  const { room } = req.params;
  const messages = await Message.find({ room });
  res.status(200).json(messages);
});

module.exports = router;