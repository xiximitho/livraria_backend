const { format } = require("date-fns");
const { utcToZonedTime } = require("date-fns-tz");

const {
  OauthAccessToken,
  OauthClient,
  OauthPasswordRecovery,
  Sequelize: { fn, Op },
} = require("../model");
// const {sendEmail} = require('../service/email-sender');

function expiresIn(oauthPasswordRecovery) {
  const date = utcToZonedTime(
    oauthPasswordRecovery.expires,
    "America/Sao_Paulo"
  );

  return format(
    date,
    `dd/MM/yyyy 'à${date.getHours() > 1 ? "s" : ""}' HH:mm:ss`
  );
}

module.exports = {
  fetchIdentification: (token, databaseAlias) =>
    OauthAccessToken(databaseAlias).findOne({
      where: {
        accessToken: token,
        expires: {
          [Op.gt]: fn("now"),
        },
      },
      order: [["expires", "DESC"]],
    }),
  fetchLastPasswordRecoveryAttempt: (email, databaseAlias) =>
    OauthPasswordRecovery(databaseAlias).findOne({
      where: {
        clientId: email,
      },
      order: [["expires", "DESC"]],
    }),
  fetchUser: (email, databaseAlias) =>
    OauthClient(databaseAlias).findOne({
      where: {
        clientId: email,
      },
    }),
  sendPinByEmail: (
    oauthPasswordRecovery,
    pin,
    { databaseAlias, emailConfigIdentifier = "no-reply" } = {}
  ) =>
    sendEmail(
      {
        to: oauthPasswordRecovery.clientId,
        subject: "Recuperação de senha",
        html: `
      <p>Utilize o PIN abaixo para dar continuidade à recuperação da senha da sua conta:</p>
      <br>
      <h2>${pin}</h2>
      <br>
      <p>O PIN expira em ${expiresIn(oauthPasswordRecovery)}.</p>
    `,
      },
      { databaseAlias, emailConfigIdentifier }
    ),
  createUser: (clientId, password, databaseAlias) =>
    OauthClient(databaseAlias).create({
      clientId: clientId,
      clientSecret: password,
      redirectUri: "/oauth/receivecode",
    }),
  updatePasswordUser: (clientId, password, databaseAlias) =>
    OauthClient(databaseAlias).update(
      {
        clientSecret: password,
      },
      {
        where: {
          clientId: clientId,
        },
      }
    ),
  deleteUser: (clientId, databaseAlias) =>
    OauthClient(databaseAlias).destroy({
      where: {
        clientId: clientId,
      },
    }),
};
