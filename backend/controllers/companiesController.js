import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";

// returns list of all companies

const getCompanies = async (req, res) => {
    // console.log("t");

    try{

      const companies = await Companies.find();
      res.json(companies);

    } catch(err){
      console.log(err);
    }

  };


  const postCompanies = async (req, res) => {
    console.log("test du post");

    
  };


export  { getCompanies, postCompanies};