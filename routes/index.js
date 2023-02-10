const adminRoutes = require("./adminRoutes");
const homeRoutes = require("./homeRoutes");

module.exports = (app) => {
  app.use("/", adminRoutes);
  app.use("/", homeRoutes);
};
