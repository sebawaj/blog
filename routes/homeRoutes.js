const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);

router.get("/article/:id", homeController.articles);

router.post("/article/:id/create-comment", commentsController.store);

router.get("/api", homeController.api);

module.exports = router;
