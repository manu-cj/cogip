import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";
import { sanitize } from "../utils/sanitize.js";

// returns list of all companies

const getCompanies = async (req, res) => {
    // console.log("t");
    try{
      const companies = await Companies.find();
      return res.status(200).json({ companies });

    } catch(err){
      res.status(500).json({ message: `SERVER ERROR : ${err.message}` });
    }

  };

  const postCompanies = async (req, res) => {

    try{

      const { name, contry, vat, createdAt, updatedOn } = req.body;
      const companies = new Companies({name, contry, vat, createdAt})
      await companies.save();

      const existingCompanies = await Companies.find({ name });
      if(existingCompanies){
        return res.status(400).json({ message: "Company name alreay use" });
      }

    } catch(err){
      res.status(500).json({ message: `SERVER ERROR ${error.message}` });
    }
  };


export  { getCompanies , postCompanies};