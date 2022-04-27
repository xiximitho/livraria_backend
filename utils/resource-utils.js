const { validationResult } = require("express-validator");

const { errorFormatter, RequestError } = require("./validator-utils");

function error(res, details) {
  return response(500, res, details);
}

function response(code, res, details) {
  return (response) => {
    if (response instanceof Error) {
      console.error(
        `\x1b[91m\x1b[1m${response.name}:\x1b[0m \x1b[91m${response.message}\x1b[0m`
      );
    }

    return res.status(response.code || code).send({
      ...(response
        ? response instanceof Error
          ? {
              error:
                response instanceof RequestError
                  ? response.error
                  : Object.keys(response).length > 0
                  ? response
                  : String(response),
            }
          : { response }
        : {}),
      ...(details ? { details } : {}),
    });
  };
}

module.exports = {
  error,
  response,
  created: (res, details) => response(201, res, details),
  ok: (res, details) => response(200, res, details),
  url: (url) => `${process.env.BASE_URL}${url}`,
  validate: (...validations) => {
    return async (req, res, next) => {
      for (const validation of validations) {
        if ((await validation.run(req)).errors.length) {
          break;
        }
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return Promise.reject(
          new RequestError(
            errors.formatWith(errorFormatter).array({
              onlyFirstError: true,
            })[0]
          )
        ).catch(error(res));
      }

      return next();
    };
  },
};
