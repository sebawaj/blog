const { faker } = require("@faker-js/faker");
const { Article } = require("../models");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = [];

  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");

  const usersLoaded = await User.findAll();

  for (let i = 0; i < 5; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(5, "\n\n"),
      image: faker.image.abstract(),
      author: usersLoaded[i].get({ plain: true }).id,
      //esto se lo hice para que no las creara a todas en el mismo momento
      createdAt: faker.date.past(),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
