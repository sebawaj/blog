const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName(),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
