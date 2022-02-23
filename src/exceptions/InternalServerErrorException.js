class InternalServerErrorException extends Error {
  code;
  constructor (message, errorCode = 500) {
    super(message);
    this.code = errorCode;
  }
}

export default InternalServerErrorException;
