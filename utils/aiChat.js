const { CohereClient } = require("cohere-ai");

// Create Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

module.exports = async function chatWithAI(message) {
  const response = await cohere.generate({
    model: "command",
    prompt: `
You are WanderBot, a helpful AI assistant for a travel and accommodation platform called WanderLust.

User question:
${message}
`,
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.generations[0].text.trim();
};