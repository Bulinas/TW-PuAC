const Database = require("../database/database");
const ObjectID = require("mongodb").ObjectID;
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
      let products = await this.database.getAllByFilter("products", {
        userId: tokenInfo.token.id,
      })
      for (let i = 0; i < products.length; i++) {
        let comments = await this.database.getAllByFilter("comments", { product_id: ObjectID(products[i]._id) })
        for (let j = 0; j < comments.length; j++) {
          const advisor = await this.database.getByFilter("advisers", { _id: ObjectID(comments[j].advisor_id) })
          comments[j].advisor_name = advisor.name;
        }
        products[i].comments = comments;
      }
      return new Ok(
        products
      );
    }
  };
}

module.exports = ProductsController;