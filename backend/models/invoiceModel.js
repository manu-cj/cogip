import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  reference: {
    type: String,
    maxlength: 50,
    unique: true,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
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

export default mongoose.model("Invoice", InvoiceSchema);
