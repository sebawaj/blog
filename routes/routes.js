const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/admin", async (req, res) => {
  const user = await User.create({
    firstname: "María",
    lastname: "Pérez",
  });

  console.log(user);

  return res.render("admin");
});

module.exports = router;
