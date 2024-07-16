import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Companies",
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
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  image: {
    filename: {
      type: String,
      default: "default.jpg", // Default image filename
    },
    path: {
      type: String,
      default: "public/assets/img/people/default.jpg", // Default image path
    },
    originalName: {
      type: String,
      default: "default.jpg", // Default original name
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.model("Contact", ContactSchema);
