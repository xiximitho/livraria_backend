const db = require("./db");

module.exports = {
  development: {
    ...db.docker_dev,
  },
  test: {
    ...db.docker_dev,
  },
  production: {
    ...db.docker_dev,
  },
};
