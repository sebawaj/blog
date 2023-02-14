const User = require("../models/User");
const Comment = require("../models/Comment");

const store = async (req, res) => {
  const articleId = req.params.id;
  const createdCommentName = req.body.name;
  const createdCommentContent = req.body.comment;

  await Comment.create({
    name: createdCommentName,
    content: createdCommentContent,
    article_id: articleId,
  });

  return res.redirect(`/article/${articleId}`);
};

module.exports = { store };
