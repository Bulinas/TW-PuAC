class Deleted {
  constructor(body) {
    this.body = body;
    this.status = 202;
    this.statusMessage = "Deleted";
  }

  getBody() {
    return JSON.stringify(this.body);
  }
}

module.exports = Deleted;
