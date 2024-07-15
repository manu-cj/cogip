import mongoose from "mongoose";

const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    match: [emailRegex, "Invalid email address"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 60,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
