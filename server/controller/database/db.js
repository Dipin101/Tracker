const mongoose = require("mongoose");
// require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/oneapp", {
      dbName: "oneapp",
    });
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
