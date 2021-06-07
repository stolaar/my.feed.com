const BaseError = require("./BaseError")

class HTTPError extends BaseError {
    constructor(message, name, httpCode = 400, description = 'http error', isOperational = true) {
        super(message, name, httpCode, description, isOperational);
    }
}

module.exports = HTTPError
