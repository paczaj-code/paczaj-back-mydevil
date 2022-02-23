class BadRequestException extends Error {
  code;
  constructor (message, errorCode = 400) {
    super(message);
    this.code = errorCode;
  }
}
export default BadRequestException;
