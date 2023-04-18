/* // using FILE
const usersDB = {
  users: require("../model/data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
*/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
const path = require("path");
const fsp = require("fs").promises;
*/
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  /* // using FILE
  const foundUser = usersDB.users.find((person) => person.username === user); */
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  const roles = Object.values(foundUser.roles);
  console.log(
    "roles from Object.values =>  " + roles + " typeof " + typeof roles
  );
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      //payload
      {
        // UserInfo is a namespace here
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // saving users with refresh token

    /* // using FILE
    const otherUsers = usersDB.users.filter(
      (u) => u.username !== foundUser.username
    );

    const currentUser = { ...foundUser, refreshToken };

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsp.writeFile(
      path.join(__dirname, "..", "model/data", "users.json"),
      JSON.stringify(usersDB.users)
    ); */

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None", // is required in chrome else gives error
      secure: true, // is required in chrome else gives error // commented becuase it cause error with thunderclient
    });

    res.json({
      success: `User ${user} is logged in! \n accessToken : ${accessToken}`,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
