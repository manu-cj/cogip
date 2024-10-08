import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Permission", PermissionSchema);
