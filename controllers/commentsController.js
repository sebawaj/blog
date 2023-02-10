const Comment = require("../models/Comment");

const store = async (req, res) => {
  const articleId = req.params.id;
  const createdCommentUser = req.body.user;
  const createdCommentContent = req.body.content;

  await Comment.create({
    content: `${createdCommentContent}`,
  });

  return res.redirect(`/article/${articleId}`);
};

module.exports = { store };
