module.exports.privacy = (req, res) => {
  console.log("Rendering privacy page");
  res.render("./static/privacy");
};

module.exports.terms = (req, res) => {
  res.render("./static/terms");
};
