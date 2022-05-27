const express = require("express");
const app = express();

//Rotas
const index = require("./api/routes/index");
const livrosVenda = require("./api/routes/livrosVenda");
const user = require("./api/routes/user");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", index);
app.use("/livros", livrosVenda);
app.use("/user", user);

module.exports = app;
