import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";

// returns list of all companies

const getCompanies = async (req, res) => {
    // console.log("t");

    try{
      const companies = await Companies.find();
      res.status(200).res.json(companies);

    } catch(err){
      res.status(500).json({ message: "SERVER ERROR" });
    }

  };


  const postCompanies = async (req, res) => {
    console.log("test du post");

    
  };


export  { getCompanies, postCompanies};