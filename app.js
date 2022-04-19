const express = require('express');
const app = express();

//Rotas
const index = require('./api/routes/index');
const livrosVenda = require('./api/routes/livrosVenda');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/livros', livrosVenda);

module.exports = app;