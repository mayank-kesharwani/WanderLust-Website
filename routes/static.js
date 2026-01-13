const express = require("express");
const router = express.Router();
const staticController = require("../controllers/static");

// Privacy page
router.route("/privacy")
  .get(staticController.privacy);

// Terms page
router.route("/terms")
  .get(staticController.terms);

module.exports = router;