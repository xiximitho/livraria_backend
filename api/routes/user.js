const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-resource");

router.post("/post", controller.createUser);

module.exports = router;
