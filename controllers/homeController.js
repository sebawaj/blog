const Article = require("../models/Article");
const { format } = require("date-fns");
const Comment = require("../models/Comment");
const User = require("../models/User");

const index = async (req, res) => {
  const articles = await Article.findAll();
  let articleDate = [];
  for (article of articles) {
    articleDate.push({
      parsedCreatedAt: format(
        article.dataValues.createdAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
      parsedUpdatedAt: format(
        article.dataValues.updatedAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
    });
  }

  return res.render("home", { articles, articleDate });
};

const articles = async (req, res) => {
  const article = await Article.findByPk(req.params.id);

  const parsedArticleDates = {
    parsedCreatedAt: format(article.createdAt, "MMMM do yyyy, h:mm:ss a"),
    parsedUpdatedAt: format(article.updatedAt, "MMMM do yyyy, h:mm:ss a"),
  };
  const comments = await Comment.findAll({
    where: { article_id: req.params.id },
  });

  return res.render("article", {
    articles,
    article,
    parsedArticleDates,
    comments,
  });
};

const api = async (req, res) => {
  const articles = await Article.findAll();
  res.json({ articles });
};

module.exports = { index, articles, api };
