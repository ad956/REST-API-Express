const express = require("express");
const router = express.Router();
const path = require("path");
const studentController = require("../../controllers/studentController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");

router
  .route("/")
  .get(studentController.getAllStudent)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    studentController.createStudent
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    studentController.updateStudent
  )
  .delete(verifyRoles(ROLES_LIST.Admin), studentController.deleteStudent);

router.route("/:id").get(studentController.getStudent);

router.get("/*", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res
    .status(404)
    .sendFile(path.join(__dirname, "..", "..", "views", "notfound.html"));
});

module.exports = router;
