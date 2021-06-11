const Ok = require("../responses/ok");
const Created = require("../responses/created");
const BadRequest = require("../responses/bad-request");
const MethodNotAllowed = require("../responses/method-not-allowed");
const Deleted = require("../responses/deleted");

const Database = require("../database/database");
const ObjectID = require("mongodb").ObjectID;
const TokenUtils = require("../utils/token");

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
    let tokenUtils = new TokenUtils();
    if (req.method === "POST" && req.url === "/advisers") {
      if (!req.body) {
        return new BadRequest("Missing body!");
      }
      if (!req.body.name) {
        return new BadRequest("Missing name for adviser!");
      }
      let randomUrl = getRandomBytes(32);

      let tokenInfo = tokenUtils.extractToken(req, res);

      if (tokenInfo.status == false) {
        return new BadRequest("You have to be authenticated!");
      }

      let newAdviser = {
        name: req.body.name,
        randomURL: randomUrl,
        userId: tokenInfo.token.id,
      };

      let createdAdviser = await this.database.insert("advisers", newAdviser);

      return new Created(createdAdviser);
    } else if (req.method === "GET" && req.url === "/advisers") {
      let tokenInfo = tokenUtils.extractToken(req, res);
      if ((tokenInfo.status = false)) {
        return new BadRequest("You have to be authenticated!");
      }
      let advisers = await this.database.getAllByFilter("advisers", {
        userId: tokenInfo.token.id,
      });
      return new Ok(advisers);
    } else if (req.method === "DELETE" && req.url.match(/\/advisers\/(.*)/)) {
      // console.log("Here!");

      let str = req.url;
      str = str.substring(str.length - 24);

      let filter = {
        _id: ObjectID(str),
      };

      let resp = await this.database.delete("advisers", filter);

      return new Deleted(resp);
    } else if (req.method === "GET" && req.url.match(/\/advisers\/(.*)/)) {
      let filter = {
        randomURL: req.url,
      };
      console.log(req.url);
      return new BadRequest("ceva");
    }
  };
}

module.exports = AdvisersController;
