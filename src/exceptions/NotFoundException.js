class NotFoundException extends Error {
  constructor (message, errorCode = 404) {
    super(message);
    this.code = errorCode;
  }
}

module.exports = NotFoundException;
