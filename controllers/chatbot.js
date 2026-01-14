const chatWithCohere = require("../utils/aiChat.js");
const Listing = require("../models/listing.js");

module.exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const cleanMessage = message?.trim();

    if (!cleanMessage || cleanMessage.length > 500) {
      return res.status(400).json({ error: "Invalid message" });
    }

    const lower = cleanMessage.toLowerCase();

    // =========================
    // 1️⃣ CATEGORY-BASED SEARCH
    // =========================
    const categories = [
      "beach",
      "mountains",
      "rooms",
      "villa",
      "farms",
      "pools",
      "arctic",
      "flights",
      "train",
      "iconic cities"
    ];

    const matchedCategory = categories.find(cat =>
      lower.includes(cat)
    );

    if (matchedCategory) {
      const listings = await Listing.find({
        category: new RegExp(matchedCategory, "i")
      }).limit(3);

      if (!listings.length) {
        return res.json({
          reply: `Sorry 😅 I couldn’t find any ${matchedCategory} listings right now.`,
        });
      }

      let reply = `Here are some ${matchedCategory} listings:\n\n`;

      listings.forEach((l, i) => {
        reply += `${i + 1}. ${l.title} – ₹${l.price} (${l.location})\n`;
      });

      return res.json({ reply });
    }

    // =========================
    // 2️⃣ PRICE-BASED SEARCH
    // =========================
    const priceMatch = lower.match(/under\s?(\d+)/);

    if (priceMatch) {
      const maxPrice = Number(priceMatch[1]);

      const listings = await Listing.find({
        price: { $lte: maxPrice }
      }).limit(3);

      if (!listings.length) {
        return res.json({
          reply: `No listings found under ₹${maxPrice}.`,
        });
      }

      let reply = `Listings under ₹${maxPrice}:\n\n`;

      listings.forEach((l, i) => {
        reply += `${i + 1}. ${l.title} – ₹${l.price} (${l.location})\n`;
      });

      return res.json({ reply });
    }

    // =========================
    // 3️⃣ FALLBACK TO AI
    // =========================
    const reply = await chatWithCohere(cleanMessage);
    return res.json({ reply });

  } catch (err) {
    console.error("Chatbot Error:", err);
    return res.json({
      reply:
        "⚠️ Something went wrong. Please try again later.",
    });
  }
};