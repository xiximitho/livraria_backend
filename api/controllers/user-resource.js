const express = require("express");
const router = express.Router();
const model = require("./../model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/**
 * @swagger
 * /core/api/v1/rest/users:
 *    post:
 *      description: Cria um usuário para testes
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: login
 *          description: Login do usuário
 *          in: formData
 *          required: true
 *          type: string
 *        - name: senha
 *          description: Senha do usuário
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: O objeto do usuário
 *        500:
 *          description: Erro ao criar usuário
 */ /*
router.post("/core/api/v1/rest/users", function (req, resp) {
  let hash = bcrypt.hashSync(req.body.senha, 10);

  model.Usuario.create({
    nome: req.body.nome,
    login: req.body.login,
    senha: hash,
  })
    .then((user) => {
      return resp.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      return resp.status(500).send({ error: err });
    });
});*/

exports.createUser = (req, res, next) => {
  let hash = bcrypt.hashSync(req.body.senha, 10);

  model.Usuario.create({
    nome: req.body.nome,
    login: req.body.login,
    senha: hash,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
};
