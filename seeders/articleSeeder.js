const { faker } = require("@faker-js/faker");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 0; i < 30; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
      image: faker.image.abstract(),
      author: faker.lorem.sentence(2),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
