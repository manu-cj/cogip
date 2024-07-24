import mongoose from "mongoose";

const cookieSchema = new mongoose.Schema({
    name: String,
    roleId: String
  });

export default mongoose.model('Cookie', cookieSchema );