const { check, header } = require("express-validator");
const { compareSync } = require("bcrypt");
const { isPast } = require("date-fns");

const { requestError } = require("../utils/validator-utils");

const oauth = require("../api/controllers/oauth-controller");

function clientIdExists() {
  return clientIdIsEmail().custom((email, { req }) =>
    oauth.fetchUser(email, req.header("Database")).then((oauthClient) => {
      if (!oauthClient) {
        return Promise.reject(
          requestError(
            "não foi encontrado nenhum cadastro com este endereço de e-mail",
            404
          )
        );
      }
    })
  );
}

function clientIdIsEmail() {
  return hasField("client_id")
    .isEmail()
    .withMessage(requestError("o e-mail informado é inválido"));
}

function hasField(field) {
  return check(field)
    .exists()
    .withMessage(
      {
        client_id: requestError("é necessário informar um endereço de e-mail"),
        client_secret_confirmation: requestError(
          "é necessário confirmar a senha"
        ),
        client_secret: requestError("é necessário informar uma senha"),
        pin: requestError(
          "é necessário informar o código de recuperação de senha"
        ),
      }[field]
    );
}

function pinIsValid() {
  return hasField("pin")
    .isString()
    .withMessage(
      requestError(
        "o código de recuperação de senha deve estar em formato de string"
      )
    )
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage(
      requestError(
        "o código de recuperação de senha é constituído de 6 algarismos que podem ir de 0 a 9"
      )
    )
    .custom((pin, { req }) => {
      return oauth
        .fetchLastPasswordRecoveryAttempt(
          req.body.client_id,
          req.header("Database")
        )
        .then((oauthPasswordRecovery) => {
          if (!compareSync(pin, oauthPasswordRecovery.recoveryPin)) {
            return Promise.reject(
              requestError(
                "o código de recuperação de senha informado é inválido",
                401
              )
            );
          }

          if (isPast(oauthPasswordRecovery.expires)) {
            return Promise.reject(
              requestError("este código de recuperação de senha expirou", 403)
            );
          }
        });
    });
}

function triedToRecoverPassword() {
  return clientIdExists().custom((email, { req }) =>
    oauth
      .fetchLastPasswordRecoveryAttempt(email, req.header("Database"))
      .then((oauthPasswordRecovery) => {
        if (!oauthPasswordRecovery) {
          return Promise.reject(
            requestError(
              "não foi encontrada nenhuma tentativa de recuperação de senha",
              404
            )
          );
        }
      })
  );
}

module.exports = {
  clientIdExists: clientIdExists(),
  clientIdIsEmail: clientIdIsEmail(),
  clientIdNotExists: clientIdIsEmail().custom((email, { req }) =>
    oauth.fetchUser(email, req.header("Database")).then((oauthClient) => {
      if (oauthClient) {
        return Promise.reject(
          requestError("já existe um cadastro com este endereço de e-mail", 403)
        );
      }
    })
  ),
  lastRecoverPasswordAttempIsUsable: triedToRecoverPassword().custom(
    (email, { req }) =>
      oauth
        .fetchLastPasswordRecoveryAttempt(email, req.header("Database"))
        .then((oauthPasswordRecovery) => {
          if (isPast(oauthPasswordRecovery.expires)) {
            return Promise.reject(
              requestError(
                "o código de recuperação de senha da sua última tentativa expirou",
                403
              )
            );
          }

          if (oauthPasswordRecovery.used) {
            return Promise.reject(
              requestError(
                "o código de recuperação de senha da sua última tentativa já foi utilizado",
                403
              )
            );
          }

          if (oauthPasswordRecovery.checked) {
            return Promise.reject(
              requestError(
                "o código de recuperação de senha da sua última tentativa já foi verificado anteriormente",
                403
              )
            );
          }
        })
  ),
  passwordConfirmationMatches: hasField("client_secret_confirmation").custom(
    (password, { req }) => {
      if (password !== req.body.client_secret) {
        throw requestError("as senhas não combinam");
      }

      return true;
    }
  ),
  passwordIsValid: hasField("client_secret")
    .trim()
    .isLength({ min: 8 })
    .withMessage(requestError("a senha deve ter no mínimo 8 caracteres"))
    .isLength({ max: 64 })
    .withMessage(requestError("a senha deve ter no máximo 64 caracteres")),
  pinIsCheckedAndNotUsed: pinIsValid().custom((_, { req }) =>
    oauth
      .fetchLastPasswordRecoveryAttempt(
        req.body.client_id,
        req.header("Database")
      )
      .then((oauthPasswordRecovery) => {
        if (!oauthPasswordRecovery.checked) {
          return Promise.reject(
            requestError(
              "este código de recuperação de senha não foi verificado",
              403
            )
          );
        }

        if (oauthPasswordRecovery.used) {
          return Promise.reject(
            requestError(
              "este código de recuperação de senha já foi utilizado",
              403
            )
          );
        }
      })
  ),
  pinIsValid: pinIsValid(),
  pinIsNotChecked: pinIsValid().custom((_, { req }) =>
    oauth
      .fetchLastPasswordRecoveryAttempt(
        req.body.client_id,
        req.header("Database")
      )
      .then((oauthPasswordRecovery) => {
        if (oauthPasswordRecovery.checked) {
          return Promise.reject(
            requestError(
              "este código de recuperação de senha já foi verificado anteriormente",
              403
            )
          );
        }
      })
  ),
  triedToRecoverPassword: triedToRecoverPassword(),
  userIsAuthorized: header("authorization")
    .exists()
    .withMessage(
      requestError("é necessário providenciar um token de acesso", 401)
    )
    .trim()
    .matches(/^Bearer [A-Za-z0-9]+$/)
    .withMessage(requestError("o token de acesso providenciado é inválido"))
    .custom((token, { req }) =>
      oauth
        .fetchIdentification(
          token.replace("Bearer ", ""),
          req.header("Database")
        )
        .then((oauthAccessToken) => {
          if (!oauthAccessToken) {
            return Promise.reject(requestError("acesso negado", 403));
          }

          req.userEmail = oauthAccessToken.clientId;
        })
    ),
};
