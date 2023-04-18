const mongoose = require("mongoose");

const URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/students";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log("DB ERROR => " + err);
  }
};

module.exports = connectDB;
