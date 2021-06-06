class Ok {
  constructor(body) {
    this.body = body;
    this.status = 200;
    this.statusMessage = "Ok";
  }

  getBody() {
    return JSON.stringify(this.body);
  }
}

module.exports = Ok;
