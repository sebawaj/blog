require("dotenv").config();

const express = require("express");
const routes = require("./routes/routes");
const dbInitialSetup = require("./dbInitialSetup");
const port = process.env.APP_PORT;
const app = express();

app.set("view engine", "ejs");

app.use("/", routes);

dbInitialSetup();

app.listen(port, () => {
  console.log(`Listening... http://localhost:${port}`);
});
