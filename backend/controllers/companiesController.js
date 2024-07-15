import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";
import { sanitize } from "../utils/sanitize.js";

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

    let {name, contry, vat, createdAt, updatedOn} = req.body;
    const maxLen = 25;
    const maxLenDate = 12; 
    const maxLenVat = 2;

    // name = sanitize(name);
    // contry = sanitize(contry);
    // vat = sanitize(vat);
    // createdAt = sanitize(createdAt);
    // updatedOn = sanitize(updatedOn);

    if (!name || !contry || !vat) {
      return res.status(400).json({
        message: "Invalid request, please make sure all parameters are sent.",
      });

    }

    if( createdAt || updatedOn > Date()){ // Verify if the input date is < of the Date.now
      return res.status(400).json({
        message: "Invalid request, your date is invalid.",
      });
    }

    if (
      name.length > maxLen ||
      contry.length > maxLen ||
      vat.length > maxLenVat
    ) {
      return res.status(400).json({
        message: "Invalid request, max input length : 50 chars.",
      });
    }

    try{

      const existingCompanies = await Companies.find({ name });
      if(existingCompanies){
        return res.status(400).json({ message: "Company name alreay use" });
      }

    } catch(err){
      res.status(500).json({ message: `SERVER ERROR ${error.message}` });
    }
  };


export  { getCompanies, postCompanies};