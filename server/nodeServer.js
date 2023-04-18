const http = require("http");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const { myEmitter } = require("../index");

/*
const fun = async () => {
  const data = await fsp.readFile("package.json");
  console.log(data.toString());
};

fun();
*/
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  console.log(req.url + " " + " " + req.method);

  console.log("HERE => " + req.url.slice(-1)); // gives last char
  let filepath;

  /*
  if (req.url === "/" || req.url === "index.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    filepath = path.join(__dirname, "views", "index.html");

    fs.readFile(filepath, "utf8", (err, data) => {
      res.end(data);
    });
  }*/

  // other way
  /*
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      filepath = path.join(__dirname, "views", "index.html");

      fs.readFile(filepath, "utf8", (err, data) => {
        res.end(data);
      });
      break;
    case "/msg":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      filepath = path.join(__dirname, "views", "msg.html");

      fs.readFile(filepath, "utf8", (err, data) => {
        res.end(data);
      });
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");

      filepath = path.join(__dirname, "views", "notfound.html");

      fs.readFile(filepath, "utf8", (err, data) => {
        res.end(data);
      });
      break;
  } 
  */

  // better

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  const serveFile = async (fpath, contentType, res) => {
    try {
      const data = await fsp.readFile(
        fpath,
        !contentType.includes("image") ? "utf-8" : ""
      );

      //(msg, fileName, folder, rqURL, rqMethod)
      myEmitter.emit("log", "data", "data.txt", "logs", req.url, req.method);

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    } catch (err) {
      console.log(err);
      myEmitter.emit("log", err, "err.txt", "logs", req.url, req.method);
      res.statusCode = 500;
      res.end();
    }
  };

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(
          path.join(__dirname, "views", "notfound.html"),
          "text/html",
          res
        );
    }
  }
});

server.listen(port, () => {
  console.log("listening on " + port);
});
