class BaseError extends Error {
  constructor(args, stack) {
    super(args)
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }

  static knownErrors() {
    return [
      'BadRequest',
      'Unauthorized',
      'Unauthenticated',
      'RefreshTokenExpired',
      'Error'
    ]
  }
}

module.exports = BaseError
