const chatWithCohere = require("../utils/aiChat.js");

module.exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    // validation
    if (!message || message.length > 500) {
      return res.status(400).json({
        error: "Invalid message",
      });
    }

    // call Cohere
    const reply = await chatWithCohere(message);

    return res.json({ reply });

  } catch (err) {
    console.error("Cohere Error:", err);

    return res.json({
      reply:
        "⚠️ AI service is temporarily unavailable. Please try again later.",
    });
  }
};