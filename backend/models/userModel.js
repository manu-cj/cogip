import mongoose from "mongoose";

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
  image: {
    filename: String,
    path: String,
    originalName: String,
    uploadDate: { type: Date, default: Date.now },
  },
});

export default mongoose.model("User", UserSchema);
