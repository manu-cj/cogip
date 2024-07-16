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

const deleteCompany = async (req, res) => {
  const identifier = req.params.identifier;

  try {
    if (!identifier) {
      return res.status(400).json({ error: "L'identifiant de l'entreprise à supprimer n'est pas fourni." });
    }

    // Vérifiez si l'identifiant est un ID (supposons que les ID sont des nombres ou des ObjectId)
    if (!isNaN(identifier) || /^[0-9a-fA-F]{24}$/.test(identifier)) {
      // Si c'est un nombre ou un ObjectId, traitez-le comme un ID
      try {
        const deleteResult = await deleteCompaniesById(identifier);
        res.status(200).json({ message: `Entreprise supprimée avec l'ID ${identifier}.` });
      } catch (error) {
        res.status(500).json({ error: `Erreur lors de la suppression de l'entreprise par ID: ${error.message}` });
      }
    } else {
      // Sinon, traitez-le comme un nom
      try {
        const deleteResult = await deleteCompaniesByName(identifier);
        res.status(200).json({ message: `Entreprise supprimée avec le nom ${identifier}.` });
      } catch (error) {
        res.status(500).json({ error: `Erreur lors de la suppression de l'entreprise par nom: ${error.message}` });
      }
    }
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'entreprise : ', err);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'entreprise.' });
  }
};

const deleteCompaniesById = async (id) => {
  try {
    const deletedCompany = await Companies.findByIdAndDelete(id);
    if (!deletedCompany) {
      throw new Error("Entreprise non trouvée");
    }
  } catch (error) {
    throw new Error(`Erreur du serveur : ${error.message}`);
  }
};

const deleteCompaniesByName = async (name) => {
  try {
    const deletedCompany = await Companies.findOneAndDelete({ name: name });
    if (!deletedCompany) {
      throw new Error("Entreprise non trouvée");
    }
  } catch (error) {
    throw new Error(`Erreur du serveur : ${error.message}`);
  }
};


const updateCompanies = async (req, res) =>{
  
}

export { getCompanies, postCompanies, deleteCompany};
