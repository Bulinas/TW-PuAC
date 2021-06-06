const Database = require("../database/database");

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

      let newProduct = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        rating: 0.0,
      };

      let createdProduct = await this.database.insert("products", newProduct);

      return new Created(createdProduct);
    } else if (req.method === "GET" && req.url === "/products") {
      return new Ok(await this.database.getAllByFilter("products"));
    }
  };
}

module.exports = ProductsController;
