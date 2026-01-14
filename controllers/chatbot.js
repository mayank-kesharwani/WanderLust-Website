const chatWithAI = require("../utils/aiChat.js");

module.exports.chat = async (req, res) => {
  try {
    console.log("AI route hit");        // 👈 ADD
    const { message } = req.body;

    if (!message || message.length > 500) {
      return res.status(400).json({ error: "Invalid message" });
    }

    const reply = await chatWithAI(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service unavailable" });
  }
};