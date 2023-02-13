const User = require("../models/User");
const Comment = require("../models/Comment");

const store = async (req, res) => {
  const articleId = req.params.id;
  const createdCommentUser = req.body.username;
  const createdCommentContent = req.body.comment;

  const createdUser = await User.create({
    username: `${createdCommentUser}`,
  });

  await Comment.create({
    content: `${createdCommentContent}`,
    user_id: createdUser.id,
    article_id: articleId,
  });

  return res.redirect(`/article/${articleId}`);
};

module.exports = { store };
