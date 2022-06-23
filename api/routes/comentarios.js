const express = require("express");
const router = express.Router();
const controller = require("../controllers/comentarios-resource");

router.get("/get", controller.getById_Livro);
router.post("/post", controller.createComentarios);

module.exports = router;
