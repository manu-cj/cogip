import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RolePermissionSchema = new Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  },
});

export default mongoose.model("RolePermission", RolePermissionSchema);
