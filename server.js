const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const port = process.env.APP_PORT;
const routes = require("./routes/routes");

app.set("view engine", "ejs");

app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
