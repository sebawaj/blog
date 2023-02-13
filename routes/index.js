const adminRoutes = require("./adminRoutes");
const apiRoutes = require("./apiRoutes");
const homeRoutes = require("./homeRoutes");

module.exports = (app) => {
  app.use("/", adminRoutes);
  app.use("/", apiRoutes);
  app.use("/", homeRoutes);
};
