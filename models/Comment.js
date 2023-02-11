const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
    Comment.init(
      {
        content: {
          type: DataTypes.TEXT,
        },
        username: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "comment",
      }
    );
    return Comment;
  }
}

module.exports = Comment;
