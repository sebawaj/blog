const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const commentsController = require("../controllers/commentsController");

router.get("/", articleController.index);

router.get("/article/:id", articleController.index);

router.post("/article/:id/create-comment", commentsController.store);

module.exports = router;
