import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  companyId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  phoneNr: {
    type: String,
    required: true,
    maxlength: 50,
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

export default mongoose.model("Contact", ContactSchema);
