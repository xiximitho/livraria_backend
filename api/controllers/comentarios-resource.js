const express = require("express");
const router = express.Router();
const model = require("../model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.createComentarios = (req, res, next) => {
  model.Comentarios.create({
    id_usuario: req.body.id_usuario,
    id_livro: req.body.id_livro,
    comentario: req.body.comentario,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
};

exports.getById_Livro = (req, res, next) => {
  model.Comentarios.findAll({
    where: {
      id_livro: req.body.id_livro,
    },
  })
    .then((comentarios) => {
      return res.status(200).send({ comentarios: comentarios });
    })
    .catch((err) => {
      return res.status(500).send({ error: err });
    });
};
