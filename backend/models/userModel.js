const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({

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

module.exports = mongoose.model("Companies", companiesSchema);