import mongoose from "mongoose";
import Invoice from "./invoiceModel.js";
import Contact from "./contactModel.js";
import Type from "./typeModel.js";

const Schema = mongoose.Schema;

const CompaniesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 25,
  },

  typeId: {
    type: Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },

  country: {
    type: String,
    required: true,
    maxlength: 25,
  },

  vat: {
    type: String,
    required: true,
    unique: true,
    maxlength: 11,
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


export default mongoose.model("Companies", CompaniesSchema);
