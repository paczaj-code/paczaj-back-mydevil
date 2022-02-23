class UnauthorizedException extends Error {
  code;
  constructor (message, errorCode = 401) {
    super(message);
    this.code = errorCode;
  }
}
export default UnauthorizedException;
