const { addMinutes } = require("date-fns");
const { compareSync, hashSync } = require("bcrypt");
const { Router } = require("express");

const {
  created,
  error,
  ok,
  url,
  validate,
} = require("../../../utils/resource-utils");
const {
  OauthClient,
  Usuario,
  OauthPasswordRecovery,
} = require("../../../model");
const { requestError } = require("../../../utils/validator-utils");

const oauth = require("../../../controller/oauth-controller");
const oauthValidator = require("../../../validator/oauth-validator");

function urlOauth(endpoint) {
  console.log(`/core/api/v1/rpc/oauth${endpoint}`);
  return url(`/core/api/v1/rpc/oauth${endpoint}`);
}

const router = Router();

router.patch(
  urlOauth("/change-password"),
  validate(
    oauthValidator.triedToRecoverPassword,
    oauthValidator.pinIsCheckedAndNotUsed,
    oauthValidator.passwordIsValid,
    oauthValidator.passwordConfirmationMatches
  ),

  (req, res) =>
    oauth
      .fetchLastPasswordRecoveryAttempt(
        req.body.client_id,
        req.header("Database")
      )
      .then((oauthPasswordRecovery) => {
        oauthPasswordRecovery.used = true;

        oauthPasswordRecovery
          .save()
          .then(() => {
            oauth
              .fetchUser(req.body.client_id, req.header("Database"))
              .then((oauthClient) => {
                oauthClient.clientSecret = hashSync(req.body.client_secret, 12);

                oauthClient.save().then(ok(res)).catch(error(res));
              })
              .catch(error(res));
          })
          .catch(error(res));
      })
      .catch(error(res))
);

router.get(
  urlOauth("/check-password"),
  validate(oauthValidator.clientIdExists, oauthValidator.passwordIsValid),

  (req, res) =>
    oauth
      .fetchUser(req.body.client_id, req.header("Database"))
      .then((oauthClient) => {
        return compareSync(req.body.client_secret, oauthClient.clientSecret)
          ? res.status(200).send(oauthClient)
          : Promise.reject(requestError("e-mail ou senha inválidos", 401));
      })
      .catch(error(res))
);

router.post(
  urlOauth("/check-recovery-pin"),
  validate(
    oauthValidator.triedToRecoverPassword,
    oauthValidator.pinIsNotChecked
  ),

  (req, res) =>
    oauth
      .fetchLastPasswordRecoveryAttempt(
        req.body.client_id,
        req.header("Database")
      )
      .then((oauthPasswordRecovery) => {
        oauthPasswordRecovery.checked = true;

        oauthPasswordRecovery.save().then(ok(res)).catch(error(res));
      })
      .catch(error(res))
);

router.post(
  urlOauth("/create-user"),
  validate(
    oauthValidator.clientIdNotExists,
    oauthValidator.passwordIsValid,
    oauthValidator.passwordConfirmationMatches
  ),

  (req, res) =>
    Usuario(req.header("Database"))
      .create({
        nome: req.body.nome,
        login: req.body.login,
        senha: hashSync(req.body.senha, 12),
        redirectUri: "/oauth/receivecode",
      })
      .then(created(res))
      .catch(error(res))
);

router.get(
  urlOauth("/password-recovery-attempt/:client_id"),
  validate(oauthValidator.lastRecoverPasswordAttempIsUsable),

  (req, res) =>
    oauth
      .fetchLastPasswordRecoveryAttempt(
        req.params.client_id,
        req.header("Database")
      )
      .then(ok(res))
      .catch(error(res))
);

router.post(
  urlOauth("/recover-password"),
  validate(oauthValidator.clientIdExists),

  (req, res) => {
    const pin = Array(6)
      .fill()
      .map(() => parseInt(Math.random() * 10))
      .join("");

    OauthPasswordRecovery(req.header("Database"))
      .create({
        recoveryPin: hashSync(pin, 12),
        clientId: req.body.client_id,
        expires: addMinutes(new Date(), 5),
      })
      .then((oauthPasswordRecovery) => {
        oauth
          .sendPinByEmail(oauthPasswordRecovery, pin, {
            databaseAlias: req.header("Database"),
            emailConfigIdentifier: req.header("EmailConfig"),
          })
          .then(() => {
            return res.status(201).send(oauthPasswordRecovery);
          })
          .catch(error(res));
      })
      .catch(error(res));
  }
);

module.exports = router;
