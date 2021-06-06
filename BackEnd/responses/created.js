class Created {
  constructor(body) {
    this.body = body;
    this.status = 201;
    this.statusMessage = "Created";
  }

  getBody() {
    return JSON.stringify(this.body);
  }
}

module.exports = Created;
