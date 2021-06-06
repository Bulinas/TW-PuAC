const Database = require("../database/database");

const TokenUtils = require("../utils/token");

const Ok = require("../responses/ok");
const Created = require("../responses/created");
const BadRequest = require("../responses/bad-request");
const MethodNotAllowed = require("../responses/method-not-allowed");

class ProductsController {
  constructor() {
    this.database = new Database();
  }

  init = async (req, res) => {
    await this.database.init();
  };

  solve = async (req, res) => {
    let tokenUtils = new TokenUtils();
    if (req.method === "POST" && req.url === "/products") {
      if (!req.body) {
        return new BadRequest("Missing body!");
      }
      if (
        !req.body.title ||
        !req.body.price ||
        !req.body.description ||
        !req.body.image
      ) {
        return new BadRequest(
          "Missing title or price or description or image!"
        );
      }

      let tokenInfo = tokenUtils.extractToken(req, res);

      if (tokenInfo.status == false) {
        return new BadRequest("You have to be authenticated!");
      }

      let newProduct = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        rating: 0.0,
        userId: tokenInfo.token.id,
      };

      let createdProduct = await this.database.insert("products", newProduct);

      return new Created(createdProduct);
    } else if (req.method === "GET" && req.url === "/products") {
      let tokenInfo = tokenUtils.extractToken(req, res);
      if (tokenInfo.status == false) {
        return new BadRequest("You have to be authenticated!");
      }
      return new Ok(
        await this.database.getAllByFilter("products", {
          userId: tokenInfo.token.id,
        })
      );
    }
  };
}

module.exports = ProductsController;