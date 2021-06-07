const BaseError = require("./BaseError")

class ErrorHandler  {
    handleError(err, res) {
        const statusCode = err.httpCode || 500
        return res ? res.status(statusCode).send(err) : err
    }

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

module.exports = new ErrorHandler()
