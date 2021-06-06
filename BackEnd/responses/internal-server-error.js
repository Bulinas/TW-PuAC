class InternalServerError {
  constructor(body) {
    this.body = body;
    this.status = 500;
    this.statusMessage = "Internal Server Error";
  }

  getBody = () => {
    return JSON.stringify(this.body);
  };
}

module.exports = InternalServerError;
