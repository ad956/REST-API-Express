const jwt = require("jsonwebtoken");
const path = require("path");
// require("dotenv").config();

/*
   JWT FLOW

  store refreshToken in user details(DB) , and share aceesstoken to front end;
  at the time of verification acessToken is provided than it is compared with its acessTokenSecret .. if true we goes to next()

*/
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; //req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); //401 Unauthorized

  // console.log(authHeader); // Bearer token

  const token = authHeader.split(" ")[1];
  // console.log(token);
  jwt.verify(
    token, // accesstoken
    process.env.ACCESS_TOKEN_SECRET,

    (err, decoded) => {
      if (err) return res.sendStatus(403); // invalid token // 403 Forbidden
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      next();
    }
  );
};

module.exports = verifyJWT;
