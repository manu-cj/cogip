import mongoose from "mongoose";


const CompaniesSchema = new mongoose.Schema({

    name:{
        type : String,
        required : true,
        unique : true
    },

    country:{
        type : String,
        required : true,
        unique : true
    },
    
    tva:{
        type : Number,
        required : true,
        unique : true
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