const Ok = require("../responses/ok");
const Created = require("../responses/created");
const BadRequest = require("../responses/bad-request");
const MethodNotAllowed = require("../responses/method-not-allowed");

const Database = require("../database/database");

const crypto = require("crypto");

function getRandomBytes(count) {
  return crypto
    .randomBytes(count / 2)
    .toString("hex")
    .slice(0, count);
}

class AdvisersController {
  constructor() {
    this.database = new Database();
  }

  init = async (req, res) => {
    await this.database.init();
  };

  solve = async (req, res) => {
    if (req.method === "POST" && req.url === "/advisers") {
      if (!req.body) {
        return new BadRequest("Missing body!");
      }
      if (!req.body.name) {
        return new BadRequest("Missing name for adviser!");
      }
      let randomUrl = getRandomBytes(32);

      let newAdviser = {
        name: req.body.name,
        randomURL: randomUrl,
      };

      let createdAdviser = await this.database.insert("advisers", newAdviser);

      return new Created(createdAdviser);
    }
  };
}

module.exports = AdvisersController;
