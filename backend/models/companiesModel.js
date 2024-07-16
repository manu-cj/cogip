import mongoose from "mongoose";

const CompaniesSchema = new mongoose.Schema({

    name:{
        type : String,
        required : true,
        unique : true,
        maxlength : 25
    },

    country:{
        type : String,
        required : true,
        maxlength : 25
    },
    
    vat:{
        type : String,
        required : true,
        unique : true,
        maxlength : 11
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