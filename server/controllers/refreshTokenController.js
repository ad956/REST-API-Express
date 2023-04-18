/*
// using FILE
const usersDB = {
  users: require("../model/data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

*/

const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized

  console.log(cookies);
  const refreshToken = cookies.jwt;

  /*
  // using FILE
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  */

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden

  // evalute jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== foundUser.username)
      return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        // UserInfo is a namespace here
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
