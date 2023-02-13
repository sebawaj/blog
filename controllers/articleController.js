const { format } = require("date-fns");

const Article = require("../models/Article");
const Comment = require("../models/Comment");
const User = require("../models/User");
const formidable = require("formidable");

const index = async (req, res) => {
  const articles = await Article.findAll();
  const users = await User.findAll();

  const articleId = req.params.id;
  const currentUrl = req.originalUrl;

  const articlesData = [];
  for (article of articles) {
    const articleDate = {
      parsedCreatedAt: format(
        article.dataValues.createdAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
      parsedUpdatedAt: format(
        article.dataValues.updatedAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
    };

    const userData = users.find(
      (user) => user.dataValues.id === article.author
    ).dataValues;

    const articleFormatted = {
      ...article.dataValues,
      articleDate,
      userData,
    };

    articlesData.push(articleFormatted);
  }

  if (currentUrl === "/admin") {
    return res.render("admin", {
      articles: articlesData,
    });
  } else if (currentUrl === "/") {
    return res.render("home", { articles: articlesData });
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

    const articleDate = {
      parsedCreatedAt: format(
        article.dataValues.createdAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
      parsedUpdatedAt: format(
        article.dataValues.updatedAt,
        "MMMM do yyyy, h:mm:ss a"
      ),
    };

    const userData = users.find(
      (user) => user.dataValues.id === article.author
    ).dataValues;

    const articleFormatted = {
      ...article.dataValues,
      articleDate,
      userData,
    };

    return res.render("article", { article: articleFormatted, comments });
  } else if (currentUrl === "/api/articles") {
    return res.json({ articles });
  }
};

const create = async (req, res) => {
  return res.render("admin_create");
};

const store = async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    function takeImage() {
      if (fields.image1.length !== 0) {
        return fields.image1;
      } else if (files.image !== null) {
        return files.image.newFilename;
      }
    }

    Article.create({
      title: fields.title,
      content: fields.content,
      image: takeImage(),
      author: fields.author,
    });

    return res.redirect("/admin");
  });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findByPk(id);

  return res.render("admin_edit", { id, article });
};

const update = async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    function takeImage() {
      if (fields.image1.length !== 0) {
        return fields.image1;
      } else {
        return files.image.newFilename;
      }
    }

    const articleId = req.params.id;
    Article.update(
      {
        title: fields.title,
        content: fields.content,
        image: takeImage(),
        author: fields.author,
      },
      { where: { id: articleId } }
    );
    console.log(fields);
    console.log(files);
    return res.redirect("/admin");
  });
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
