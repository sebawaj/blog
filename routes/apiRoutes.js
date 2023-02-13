const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/api/articles", articleController.index);

module.exports = router;
