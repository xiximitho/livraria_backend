class RequestError extends Error {
  constructor(error) {
    super(error);

    this.name = RequestError.name;

    this.error = error;

    this.message = error.message;
    this.code = error.code;
  }
}

module.exports = {
  RequestError,
  errorFormatter: (error) => ({
    location: error.location,
    param: error.param,
    value: error.value,
    message: error.msg.errorMessage || String(error.msg),
    code: error.msg.code || 500,
  }),
  requestError: (message, code = 422) => ({
    errorMessage: message,
    code,
  }),
};
