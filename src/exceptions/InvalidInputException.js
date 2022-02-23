class InvalidInputException extends Error {
  constructor (message, errorCode = 422) {
    super(message);
    this.code = errorCode;
  }
}

module.exports = InvalidInputException;
