class ApiException extends Error {

  constructor(message, status = 500) {
    super(message);
    this.message = message;
    this.code = status;
  }

}

module.exports = ApiException;
