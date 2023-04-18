require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const { logController } = require("./controllers/studentController");
const routes = require("./routes/routes");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connetDB = require("./config/dbConn");

// connect DB
connetDB();

console.log(__dirname);
app.use(express.static(path.join(__dirname))); // if we use __dirname, "folder" than only that content is served as static but in this we required all static from sefrver folder

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// custom middleware
app.use(logController);

// EXPRESS FOLLOWS ALL AS WATERFALL
//  .get(" ^/$|/ index (.html)? ")  => ^ means begin with /  , $ means ends with /  , | means OR ,, (.html)?  means .html is optional

app.use("/", routes);

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/stu", require("./routes/api/student"));
app.use("/usr", require("./routes/api/users"));

/*
// instaed of writing stuff like this ,, we use app.use("/",router)
app.get("/", routes);
app.get("/abc(.html)?", routes);

// route handlers
app.get("/hello", routes);
app.get("/all(.html)?", routes);

app.get("/*", routes);

*/

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html"))
    res.sendFile(path.join(__dirname, "views", "notfound.html"));
  else if (req.accepts("json")) res.json({ ERROR: "404 NOT FOUND" });
  else res.type("txt").send("404 NOT FOUND");
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log("listning on port :" + port);
  });
});
