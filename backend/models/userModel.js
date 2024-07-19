import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
    default: "669a1e4ac5b7248960abcf9f",
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
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  image: {
    filename: {
      type: String,
      default: "default.jpg",
    },
    path: {
      type: String,
      default: "public/assets/img/people/default.jpg",
    },
    originalName: {
      type: String,
      default: "default.jpg",
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.model("User", UserSchema);
