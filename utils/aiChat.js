const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function chatWithAI(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are WanderBot, a helpful AI assistant for a travel and accommodation platform called WanderLust.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
};