const fs = require("fs");
const http = require("http");

http
  .createServer(function (req, res) {
    req.url = "/index.html";
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        console.log(req.url);
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(8090);
