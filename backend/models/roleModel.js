import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['user', 'admin', 'superadmin']
  },
  permissions: {
    type: [String], // Liste des permissions, par exemple ['get', 'post', 'patch']
    required: true
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

export default mongoose.model("Role", RoleSchema);
