const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {
  return res.render("admin");
});

module.exports = router;
