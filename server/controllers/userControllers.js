const User = require("../model/User");

const createUser = async (req, res) => {
  if (!req?.body?.uname || !req?.body?.pass)
    return res.status(400).json({ msg: "Username & password is required" });

  const user = await User.create({
    username: req.body.uname,
    password: req.body.pass,
  });

  res.json(user);
};
const getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ msg: "No Users found " });
  res.json(users);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ msg: "ID parameter is required" });

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user)
    return res
      .status(204)
      .json({ msg: `No student matches ID ${req.params.id} ` });

  res.json(user);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ msg: "ID parameter is required" });

  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user)
    return res
      .status(204)
      .json({ msg: `No student matches ID ${req.body.id} ` });

  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};
const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ msg: "ID parameter is required" });

  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user)
    return res
      .status(204)
      .json({ msg: `No student matches ID ${req.body.id} ` });

  if (req?.body?.uname) user.username = req.body.uname;
  if (req?.body?.roles) user.roles = req.body.roles;

  const result = await user.save();
  res.json(result);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
