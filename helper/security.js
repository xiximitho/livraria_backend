var jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  var token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  token = token.split("Bearer ")[1];

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.user.id;
    req.clientId = decoded.user.client_id;

    //    if (!verifyPermission(req.userId, req.route.path)) {
    //       return res.status(403).send({ message: 'Forbidden.' });
    //    }

    next();
  });
}

module.exports = {
  verifyJWT,
};
