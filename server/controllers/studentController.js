const { myEmitter } = require("../../index");
const Student = require("../model/Student");
/* // using FILE
const data = {
  students: require("../model/data/data.json"),
  setStudent: function (data) {
    this.students = data;
  },
};
*/

const logController = (req, res, next) => {
  console.log(req.method + " " + req.path + " ");
  myEmitter.emit(
    "log",
    "ad956",
    "reqlog.txt",
    "logs",
    req.url,
    req.method,
    __dirname
  );
  next();
};

const getAllStudent = async (req, res) => {
  // res.json(data.students);
  const students = await Student.find();
  if (!students) res.status(204).json({ msg: "No Students found" });
  res.json(students);
};

const createStudent = async (req, res) => {
  if (!req?.body?.name || !req?.body?.spec)
    return res.status(400).json({ msg: "Name and Specialisation is required" });
  /*
  // using FILE
  const newStudent = {
    id: data.students?.length
      ? data.students[data.students.length - 1].id + 1
      : 1,

    name: req.body.name,
    spec: req.body.spec,
  };  */

  try {
    const newStudent = await Student.create({
      name: req.body.name,
      spec: req.body.spec,
    });

    console.log(newStudent);
    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err);
  }

  // when using FILE
  // if (!newStudent.name || !newStudent.spec)
  //   return res.status(404).json({ msg: "Name and Specialisation is required" });

  /*  // using FILE
   data.setStudent([...data.students, newStudent]); */
};

const updateStudent = async (req, res) => {
  /* // using FILE
  const student = data.students.find((s) => s.id === parseInt(req.body.id)); */

  if (!req?.body?.id) {
    return res.status(400).json({ msg: "ID parameter is required" });
  }

  const student = await Student.findOne({ _id: req.body.id }).exec();

  if (!student)
    return res
      .status(204)
      .json({ msg: `No Student matches with id ${req.body.id}` });

  if (req.body?.name) student.name = req.body.name;
  if (req.body?.spec) student.spec = req.body.spec;

  /*
  // using FILE
  const filterStudents = data.students.filter(
    (s) => s.id !== parseInt(req.body.id)
  );

  const unsortedStudents = [...filterStudents, student];

  data.setStudent(
    unsortedStudents.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  ); */

  const result = await student.save();
  res.json(result);
};

const deleteStudent = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ msg: "ID parameter is required" });
  }

  /* // using FILE
  const student = data.students.find((s) => s.id === parseInt(req.body.id)); */

  const student = await Student.findOne({ _id: req.body.id }).exec();

  if (!student)
    return res
      .status(204)
      .json({ msg: `No Student matches with id ${req.body.id} ` });

  /* // using FILE
  const filterStudents = data.students.filter(
    (s) => s.id !== parseInt(req.body.id)
  );

  data.setStudent(
    filterStudents.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  ); 

  res.json(data.students); */
  const result = await student.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getStudent = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ msg: "ID parameter is required" });
  }

  // using FILE
  // const student = data.students.find((s) => s.id === parseInt(req.params.id));

  const student = await Student.findOne({ _id: req.params.id }).exec();

  if (!student) {
    return res
      .status(204)
      .json({ message: `No student matches ID ${req.params.id} ` });
  }
  console.log("STUDENT DATA => " + student);

  res.json(student);
};

module.exports = {
  logController,
  getStudent,
  deleteStudent,
  updateStudent,
  getAllStudent,
  createStudent,
};
