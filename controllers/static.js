module.exports.privacy = (req, res) => {
  console.log("Rendering privacy page");
  res.render("./static/privacy.ejs");
};

module.exports.terms = (req, res) => {
  res.render("static/terms.ejs");
};
