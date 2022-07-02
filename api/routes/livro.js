const express = require("express");
const router = express.Router();
const controller = require("../controllers/livro")

router.get("/get/:livro", controller.getByTitulo);
router.get("/get/", controller.getAll);
router.get("/get/livro/genre/:genre", controller.getByGenre);
router.get("/get/livro/rate/:rate", controller.getByRate);


module.exports = router;