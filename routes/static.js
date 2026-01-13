const express = require("express");
const router = express.Router();
const staticController = require("../controllers/static");

router.get("/privacy", staticController.privacy);
router.get("/terms", staticController.terms);

module.exports = router;