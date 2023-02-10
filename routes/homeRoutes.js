const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/", articleController.index);

router.get("/article/:id", articleController.index);

module.exports = router;
