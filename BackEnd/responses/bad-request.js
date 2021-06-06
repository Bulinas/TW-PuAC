class BadRequest {
  constructor(message) {
    this.message = message;
    this.status = 400;
    this.statusMessage = "Bad Request";
  }

  getBody() {
    return JSON.stringify({
      message: this.message,
    });
  }
}

module.exports = BadRequest;
