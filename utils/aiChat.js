const cohere = require("cohere-ai");

// Initialize Cohere with API key
cohere.init(process.env.COHERE_API_KEY);

module.exports = async function chatWithAI(message) {
  const response = await cohere.generate({
    model: "command",     // Best free-tier Cohere model
    prompt: `
You are WanderBot, a helpful AI assistant for a travel and accommodation platform called WanderLust.

User question:
${message}
`,
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.body.generations[0].text.trim();
};