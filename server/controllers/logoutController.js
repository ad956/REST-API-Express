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
const fsp = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // on Client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204); // No content
  }

  const refreshToken = cookies.jwt;

  // Is refreshToken is in DB ?

  /*  // using FILE
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  ); */

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(204); // Success but no content

  // delete refreshToken in DB

  /*  // using FILE
  const otherUsers = usersDB.users.filter(
    (user) => user.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsp.writeFile(
    path.join(__dirname, "..", "model/data", "users.json"),
    JSON.stringify(usersDB.users)
  ); */

  foundUser.refreshToken = "";
  const result = await foundUser.save();

  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure : true - only serves on https , (In production)
  res.sendStatus(204);
};

module.exports = { handleLogout };
