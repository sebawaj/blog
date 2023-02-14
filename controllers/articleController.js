const Article = require("../models/Article");
const formidable = require("formidable");
const { format } = require("date-fns");

const index = async (req, res) => {
  const articles = await Article.findAll();
  const articleId = req.params.id;

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

  return res.render("admin", { articles, articleDate, articleId });
};

const create = (req, res) => {
  return res.render("admin_create");
};

function getImage(fields, files) {
  if (fields.image1.length !== 0) {
    return fields.image1;
  } else if (files.image !== null) {
    return files.image.newFilename;
  }
}

const store = (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      image: getImage(fields, files),
      author: fields.author,
    });
    return res.redirect("/admin");
  });
};

const edit = async (req, res) => {
  const { id } = req.params;
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
    const articleId = req.params.id;
    Article.update(
      {
        title: fields.title,
        content: fields.content,
        image: getImage(fields, files),
        author: fields.author,
      },
      { where: { id: articleId } }
    );
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
