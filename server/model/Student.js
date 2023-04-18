const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spec: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema); // mongoose set Student to lowerCase and plural so collection name will be : students
