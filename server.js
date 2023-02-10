require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const port = process.env.APP_PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

dbInitialSetup();

app.listen(port, () => {
  console.log(`Listening... http://localhost:${port}`);
});
