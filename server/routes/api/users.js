const express = require("express");
const path = require("path");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");
const userController = require("../../controllers/userControllers");
const router = express.Router();

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), userController.getUsers)
  .post(verifyRoles(ROLES_LIST.Admin), userController.createUser)
  .put(verifyRoles(ROLES_LIST.Admin), userController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), userController.getUser);

router.get("/*", (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "..", "..", "views", "notfound.html"));
});

module.exports = router;
