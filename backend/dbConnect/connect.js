const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const dbConnect = () => {
  try {
    mongoose.connect(process.env.DB_CONNECT);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("DB connection error : ", error);
  }
};

module.exports = dbConnect;
