const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Database = require("../database/database");

const Ok = require("../responses/ok");
const Created = require("../responses/created");
const BadRequest = require("../responses/bad-request");
const MethodNotAllowed = require("../responses/method-not-allowed");

function getToken(id, username) {
  return jwt.sign(
    {
      id: id,
      username: username,
    },
    "ac7a3244067309195c1d3e862e3b1bc6",
    {
      expiresIn: "12h",
    }
  );
}

function getRandomBytes(count) {
  return crypto
    .randomBytes(count / 2)
    .toString("hex")
    .slice(0, count);
}

function hashPassword(password, salt) {
  let hashObj = crypto.createHmac("sha512", salt);
  hashObj.update(password);
  let hashedPassword = hashObj.digest("hex").substr(0, 64);
  return hashedPassword;
}

class UsersController {
  constructor() {
    this.database = new Database();
  }

  init = async (req, res) => {
    await this.database.init();
  };

  solve = async (req, res) => {
    if (req.method != "POST") {
      return new MethodNotAllowed();
    }
    if (req.url === "/users/login") {
      let existingUser = await this.database.getByFilter("users", {
        username: req.body.username,
      });
      if (!existingUser) {
        return BadRequest("Invalid credentials!");
      }

      let hashedPassword = hashPassword(
        req.body.password,
        existingUser.passwordSalt
      );
      if (hashedPassword != existingUser.password) {
        return BadRequest("Invalid credentials!");
      }

      let token = getToken(existingUser._id, existingUser.username);
      return new Ok({
        token: token,
      });
    } else if (req.url === "/users/register") {
      let existingUser = await this.database.getByFilter("users", {
        email: req.body.email,
      });
      if (existingUser != null) {
        return new BadRequest("This email address is already used!");
      }

      let userSalt = getRandomBytes(32);
      let hashedPassword = hashPassword(req.body.password, userSalt);

      let insertedUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        passwordSalt: userSalt,
      };

      let createdUser = await this.database.insert("users", insertedUser);
      let token = getToken(createdUser._id, createdUser.username);
      return new Created({
        token: token,
      });
    }
  };
}

module.exports = UsersController;