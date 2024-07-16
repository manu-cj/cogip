import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", true);

const dbConnect = () => {
  try {
    mongoose.connect(process.env.DB_CONNECT);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("DB connection error : ", error);
  }
};

export default dbConnect;
