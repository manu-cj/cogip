import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";
import { sanitize } from "../utils/sanitize.js";
import {validateCountryName} from "../utils/countryValidator.js";


//Delete *Patch  *get by id 
// returns list of all companies

const getCompanies = async (req, res) => {

  try {
    const companies = await Companies.find();
    return res.status(200).json({ companies });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR : ${err.message}` });
  }
};

const getByIdCompanies = async (req, res) =>{

};


const postCompanies = async (req, res) => {
  try {
    const { name, country, vat } = req.body;
    const companies = new Companies({ name, vat, country });

    if (!validateCountryName(country)) {
      return res.status(400).json({ error: "Invalid country" });
    }  
    
    const existingCompanies = await Companies.findOne({ name });
    if (existingCompanies) {
      return res.status(400).json({ message: `Company name alreay use : ${existingCompanies} `});
    }
    
    await companies.save(); //save companies
   return res.status(201).json({ message: "Country is valid and data saved" });

  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR ${err.message}` });
  }
};


 //find of name / country / id 

 const deleteCompanies = async (req, res) => {

  const id = req.params.id;
  try {
    const deletedCompany = await Companies.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "Company successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};





const deleteByNameCompanies = async (req, res) =>{

  // const name = req.params.name;
  // try{
  //   const deletedCompanyByName = await Companies.(name);
  //   if (!deletedCompanyByName) {
  //     return res.status(404).json({ message: "Company not found" });
  //   }
  //   return res.status(200).json({ message: "Company successfully deleted" });
  // } catch(err){
  //   res.status(500).json({ message: `SERVER ERROR: ${err.message}` });
  // }
};

export { getCompanies, postCompanies, deleteCompanies , deleteByNameCompanies};
