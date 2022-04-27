const express = require("express");
const router = express.Router();
const controller = require("../controllers/livrosVenda");

router.get("/get", controller.get);
router.get("/get/:author", controller.getByAuthor);
router.post("/post", controller.post);

module.exports = router;
