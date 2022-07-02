const express = require("express");
const router = express.Router();
const controller = require("../controllers/livro")

router.get("/get/:livro", controller.getByTitulo);

module.exports = router;