const Database = require("../database/database");
const ObjectID = require("mongodb").ObjectID;
const TokenUtils = require("../utils/token");

const Ok = require("../responses/ok");
const Created = require("../responses/created");
const BadRequest = require("../responses/bad-request");
const MethodNotAllowed = require("../responses/method-not-allowed");

class CommentsController {
  constructor() {
    this.database = new Database();
  }

  init = async (req, res) => {
    await this.database.init();
  };

  solve = async (req, res) => {
    let tokenUtils = new TokenUtils();
    if (req.method === "POST" && req.url === "/comments") {
      if (!req.body) {
        return new BadRequest("Missing body!");
      }
      if (
        !req.body.commentText ||
        !req.body.grade ||
        !req.body.advisorId ||
        !req.body.productId
      ) {
        return new BadRequest(
          "Missing text or grade or others!"
        );
      }

      let tokenInfo = tokenUtils.extractToken(req, res);

      if (tokenInfo.status == false) {
        return new BadRequest("You have to be authenticated!");
      }

      let newComment = {
        comment: req.body.commentText,
        grade: parseInt(req.body.grade),
        product_id: ObjectID(req.body.productId),
        advisor_id: ObjectID(req.body.advisorId),
      };

      let createdComment = await this.database.insert("comments", newComment);

      return new Created(createdComment);
    }
  }
}

module.exports = CommentsController;
