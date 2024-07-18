import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";
import Invoice from "./../models/invoiceModel.js";
import Contact from "./../models/contactModel.js";
import { sanitize } from "../utils/sanitize.js";
import { validateCountryName } from "../utils/countryValidator.js";

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
      return res.status(400).json({ message: `Company name alreay use : ${existingCompanies} ` });
    }

    await companies.save(); //save companies
    return res.status(201).json({ message: "Country is valid and data saved" });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR ${err.message}` });
  }
};

const deleteCompany = async (req, res) => {
  const identifier = req.params.identifier;

  if (!identifier) {
    return res.status(400).json({ message: "The identifier of the company to delete is not provided." });
  }

  try {
    if (!isNaN(identifier) || /^[0-9a-fA-F]{24}$/.test(identifier)) {
      // If it's a number or an ObjectId, treat it as an ID
      await deleteCompaniesById(identifier);
      res
        .status(200)
        .json({ message: `Company deleted with ID ${identifier}.` });
    } else {
      // Otherwise, treat it as a name
      await deleteCompaniesByName(identifier);
      res
        .status(500)
        .json({ error: `Error during company deletion: ${error.message}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error deleting the company: ${error.message}` });
  }
};

const deleteCompaniesById = async (id, session) => {
  try {
    const deletedCompany = await Companies.findByIdAndDelete(id);

    if (!deletedCompany) {
      res.status(404).json({ message: "Compnay not found" });
    }

    // Delete associated invoices and contacts
    await Invoice.deleteMany({ companyId: id });
    await Contact.deleteMany({ companyId: id });
  } catch (error) {
    res.status(500).json({ message: `server error ${error.message}` });
  }
};

const deleteCompaniesByName = async (name, session) => {
  try {
    const deletedCompany = await Companies.findOneAndDelete({ name: name });

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company name not found" });
    }

    // Delete associated invoices and contacts
    await Invoice.deleteMany({ companyId: deletedCompany._id });
    await Contact.deleteMany({ companyId: deletedCompany._id });
  } catch (error) {
    res.status(500).json({ message: `server error ${error.message}` });
  }
};

// Update of one company

const updateCompany = async (req, res) => {
  const id = req.params.id;
  const maxLen = 25;

  try {
    const name = req.body.name; // Récupérer directement la valeur de 'name' depuis req.body

    if (!name) {
      return res.status(404).json({ message: "Company name not found" });
    }

    // Vérification de la longueur du nom
    if (name.length > maxLen) {
      return res.status(400).json({ message: "Name too long, max allowed is 25 characters" });
    }

    // Mettre à jour la compagnie
    const updatedCompany = await Companies.findByIdAndUpdate(
      id,
      { name: name, updatedOn: new Date() },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company ID not found" });
    }

    // Envoyer une réponse avec le message et les données mises à jour
    res.status(200).json({ message: "Company updated", updatedCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCompanies, postCompanies, deleteCompany, updateCompany };
