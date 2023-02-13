const Article = require("../models/Article");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { format } = require("date-fns");

const index = async (req, res) => {
  const articles = await Article.findAll();
  const articleId = req.params.id;
  const currentUrl = req.originalUrl;

  let articleDate = "";
  for (article of articles) {
    articleDate = {
      parsedCreatedAt: format(
        article.dataValues.createdAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
      parsedUpdatedAt: format(
        article.dataValues.updatedAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
    };
  }

  if (currentUrl === "/admin") {
    return res.render("admin", { articles, articleDate });
  } else if (currentUrl === "/") {
    return res.render("home", { articles, articleDate });
  } else if (currentUrl === `/article/${articleId}`) {
    const article = await Article.findByPk(articleId);
    const comments = await Comment.findAll({
      where: { article_id: articleId },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    return res.render("article", { article, articleDate, comments });
  } else if (currentUrl === "/api/articles") {
    return res.json({ articles });
  }
};

const create = async (req, res) => {
  return res.render("admin_create");
};

const store = async (req, res) => {
  const createdArticleTitle = req.body.title;
  const createdArticleContent = req.body.content;
  const createdArticleImage = req.body.image;
  const createdArticleAuthor = req.body.author;

  await Article.create({
    title: `${createdArticleTitle}`,
    content: `${createdArticleContent}`,
    image: `${createdArticleImage}`,
    author: `${createdArticleAuthor}`,
  });

  return res.redirect("/admin");
};

const edit = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findByPk(id);

  return res.render("admin_edit", { id, article });
};

const update = async (req, res) => {
  const articleId = req.params.id;
  const editedArticleTitle = req.body.title;
  const editedArticleContent = req.body.content;
  const editedArticleImage = req.body.image;
  const editedArticleAuthor = req.body.author;

  await Article.update(
    {
      title: `${editedArticleTitle}`,
      content: `${editedArticleContent}`,
      image: `${editedArticleImage}`,
      author: `${editedArticleAuthor}`,
    },
    {
      where: { id: articleId },
    }
  );

  return res.redirect("/admin");
};

const destroy = async (req, res) => {
  const deletedArticleId = req.params.id;

  await Article.destroy({
    where: {
      id: deletedArticleId,
    },
  });

  return res.redirect("/admin");
};

module.exports = { index, edit, update, destroy, create, store };
