const Article = require("../models/Article");

const index = async (req, res) => {
  const articles = await Article.findAll();
  return res.render("home", { articles });
};

module.exports = { index };
