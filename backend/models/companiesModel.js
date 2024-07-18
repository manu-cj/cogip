import mongoose from "mongoose";
import Invoice from './invoiceModel.js'
import Contact from './contactModel.js'

const Schema = mongoose.Schema;

const CompaniesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 25,
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

// CompaniesSchema.pre('remove', async function(next) {
//   try {
//     await Invoice.deleteMany({ companyId: this._id });
//     await Contact.deleteMany({ companyId: this._id });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

export default mongoose.model("Companies", CompaniesSchema);
