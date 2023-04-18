const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/abc(.html)?", (req, res) => {
  res.send("<h2>HELLO</h2>");
  //res.redirect() // 302 by default
});

router.get(
  "/hello",
  (req, res, next) => {
    console.log("ATA ti next me jaiyo abaar");
    next();
  },
  (req, res) => res.send("<h3>Ae bhal para aaiya</h3>")
);

const one = (req, res, next) => {
  console.log("ONE");
  next();
};
const two = (req, res, next) => {
  console.log("TWO");
  next();
};
const three = (req, res) => {
  console.log("THIRD");
  res.send("ON THIRD ONE");
};

router.get("/all(.html)?", [one, two, three]);

module.exports = router;
