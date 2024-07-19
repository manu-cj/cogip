import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";
import Invoice from "./../models/invoiceModel.js";
import Contact from "./../models/contactModel.js";
import { sanitize } from "../utils/sanitize.js";
import Type from "./../models/typeModel.js";
import { validateCountryName } from "../utils/countryValidator.js";

//Delete *Patch  *get by id
//Delete *Patch  *get by id
// returns list of all companies

const getCompanies = async (req, res) => {
  try {
    const companies = await Companies.find().sort({ name: 1}).collation({locale: 'fr', strength: 1}).populate('typeId', 'name');
    return res.status(200).json({ companies });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR : ${err.message}` });
  }
};

const getCompaniesById = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Companies.findById(id).populate('typeId', 'name');;
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Company ID" });
    }
    return res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
  return res.status(201).json({ message : "Company found"});
};

const getLatestCompanies = async (req, res) => {
  try {
    const companies = await Companies.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .exec()
      .populate('typeId', 'name');; // Removed populate("id") as it's not needed based on the screenshot
    return res.status(200).json({ companies });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};


const getPaginatedCompanies = async (req, res) => {
  const resultsPerPage = parseInt(req.params.nbPerPage, 10);
  let page = 1;
  if (req.params.page) {
    page = parseInt(req.params.page, 10);
  }
  if (isNaN(resultsPerPage) || resultsPerPage < 1 || isNaN(page) || page < 1) {
    return res.status(400).json({
      message:
        "Bad request: make sure the nbPerPage and page are of type int and superior to 0.",
    });
  }
  try {
    const totalResults = await Companies.countDocuments();
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    if (page > totalPages) {
      return res.status(400).json({
        message: `No result found for page ${page}, last page is ${totalPages}`,
      });
    }
    const pageResults = await Companies.find()
      .sort({ name: 1 })
      .limit(resultsPerPage)
      .skip((page - 1) * resultsPerPage)
      .populate('typeId', 'name');
    return res.status(200).json({ totalResults, totalPages, pageResults });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};


const postCompanies = async (req, res) => {
  try {
    const { name, country, vat, typeId } = req.body;

    if (!validateCountryName(country)) {
      return res.status(400).json({ error: "Invalid country" });
    }

    const existingCompanies = await Companies.findOne({ name });
    if (existingCompanies) {
      return res.status(400).json({ message: `Company name already in use: ${existingCompanies}` });
    }

    // Vérifiez que le typeId est valide et obtenez l'ObjectId correspondant
    const type = await Type.findOne({ name: typeId });
    if (!type) {
      return res.status(400).json({ message: "Type of the society can only take Supplier or Client" });
    }

    // Créez l'entreprise en utilisant l'ObjectId trouvé pour typeId
    const companies = new Companies({
      name,
      vat,
      country,
      typeId: type._id // Utilisation de l'ObjectId du type trouvé
    });

    await companies.save(); // Sauvegarder l'entreprise

    // Récupérer l'entreprise sauvegardée avec le typeId populé
    const savedCompany = await Companies.findById(companies._id).populate('typeId', 'name');
    
    return res.status(201).json({ message: "Country is valid and data saved", company: savedCompany });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR: ${err.message}` });
  }
};


const deleteCompany = async (req, res) => {
  const identifier = req.params.identifier;

  if (!identifier) {
    return res
      .status(400)
      .json({
        message: "The identifier of the company to delete is not provided.",
      });
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
      return res
        .status(400)
        .json({ message: "Name too long, max allowed is 25 characters" });
    }

    // Mettre à jour la compagnie
    const updatedCompany = await Companies.findByIdAndUpdate(id,{ name: name, updatedOn: new Date() }, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company ID not found" });
    }

    // Envoyer une réponse avec le message et les données mises à jour
    res.status(200).json({ message: "Company updated", updatedCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCompanies, getCompaniesById, getPaginatedCompanies ,getLatestCompanies, postCompanies, deleteCompany, updateCompany };
