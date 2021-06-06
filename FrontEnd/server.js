// https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/
const fs = require("fs");
const http = require("http");

http
  .createServer(function (req, res) {
    if (req.url == "/" || req.url == "") {
      req.url = "/index.html";
    }
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(8080);
