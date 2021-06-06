const http = require("http");

const controllers = require("./controllers");

const BadRequest = require("./responses/bad-request");
const InternalServerError = require("./responses/internal-server-error");

const server = http.createServer(async (req, res) => {
  let bodyStr = "";
  req.on("data", (chunk) => {
    bodyStr += chunk;
  });
  req.on("end", async () => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Max-Age", 3600);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    );
    if (req.method === "OPTIONS") {
      return res.end("");
    }

    let response = null;
    try {
      let bodyObj = null;
      if (bodyStr && bodyStr !== "") {
        bodyObj = JSON.parse(bodyStr);
      }
      req.body = bodyObj;
      let controller = null;
      if (req.url.startsWith("/users")) {
        controller = new controllers.UsersController();
      } else if (req.url.startsWith("/products")) {
        controller = new controllers.ProductsController();
      } else if (req.url.startsWith("/advisers")) {
        controller = new controllers.AdvisersController();
      } else if (req.url.startsWith("/comments")) {
        controller = new controllers.CommentsController();
      }
      if (controller === null) {
        response = new BadRequest();
      } else {
        await controller.init();
        response = await controller.solve(req, res);
      }
    } catch (e) {
      console.log(e);
      response = new InternalServerError(e);
    }

    res.statusCode = response.status;
    res.statusMessage = response.statusMessage;
    let body = response.getBody ? response.getBody() : null;
    return res.end(body);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
