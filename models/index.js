const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root1234
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  }
);

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

Article.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Article, { foreignKey: "user_id" });

Article.hasMany(Comment, { foreignKey: "article_id" });
Comment.belongsTo(Article, { foreignKey: "article_id" });

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
