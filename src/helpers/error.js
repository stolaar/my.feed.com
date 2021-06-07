const BaseError = require('../errors/BaseError')

class ErrorHandler extends Error {
  constructor(name, code, message, isOperational) {
    super();
    this.name = name;
    this.code = code;
    this.message =
      typeof message === "object" ? JSON.stringify(message) : message;
    this.isOperational = isOperational;
  }
}
const handleError = (err, res) => {
  const isOperational = err instanceof BaseError
  return res.status(err.code < 500 ? err.code : 400).send(err.message);
};

const commonHttpErrors = {
  bad_request: { name: "Bad request", code: 400 },
  unauthorized: { name: "unauthorized", code: 401 },
  jwt_expired: { name: "TokenExpiredError", code: 401 },
  jwt_not_found: { name: "JsonWebTokenError", code: 401 },
  forbidden: { name: "Forbidden", code: 403 },
  not_found: { name: "Not found", code: 404 },
  internal: { name: "Internal server error", code: 500 }
};

module.exports = {
  ErrorHandler,
  handleError,
  commonHttpErrors
};
