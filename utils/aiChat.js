const { CohereClient } = require("cohere-ai");

// Create Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

module.exports = async function chatWithAI(message) {
  const response = await cohere.chat({
    model: "command-r",
    message: message,
    preamble:
      "You are WanderBot, a helpful AI assistant for a travel and accommodation platform called WanderLust.",
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.text;
};