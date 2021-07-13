const BaseError = require("./Base");

class BadRequest extends BaseError {
  constructor(message, short_message) {
    super();
    this.name = "BadRequest";
    this.httpCode = 400;
    this.message = message;
    this.short_message = this.stringifyShortMessage(short_message || message);
    if(process.env.NODE_ENV !== 'development') delete this.stack
  }

  stringifyShortMessage(short_message) {
    if(typeof short_message === 'object') {
      let firstKey = Object.keys(short_message)[0]
      return short_message[firstKey]
    }
    return short_message
  }
}

module.exports = BadRequest;
