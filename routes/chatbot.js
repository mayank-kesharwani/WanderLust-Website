const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot.js");

router.post("/chat", chatbotController.chat);

module.exports = router;