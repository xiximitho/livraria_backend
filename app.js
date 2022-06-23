const express = require("express");
const app = express();

const index = require("./api/routes/index");
const user = require("./api/routes/user");
const livrosVenda = require("./api/routes/livrosVenda");
const comentarios = require("./api/routes/comentarios");

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", index);
app.use("/user", user);
app.use("/livros", livrosVenda);
app.use("/comentarios", comentarios);

module.exports = app;
