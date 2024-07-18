import mongoose from "mongoose";
import Companies from "./../models/companiesModel.js";
import Invoice from "./../models/invoiceModel.js"
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

  try {
    if (!identifier) {
      return res.status(400).json({ error: "L'identifiant de l'entreprise à supprimer n'est pas fourni." });
    }

    // Vérifiez si l'identifiant est un ID (supposons que les ID sont des nombres ou des ObjectId)
    if (!isNaN(identifier) || /^[0-9a-fA-F]{24}$/.test(identifier)) {
      // Si c'est un nombre ou un ObjectId, traitez-le comme un ID
      try {
        const deleteResult = await deleteCompaniesById(identifier);
        res.status(200).json({ message: `Entreprise supprimée avec l'ID ${identifier}.`, deleteResult });
      } catch (error) {
        res.status(500).json({ error: `Erreur lors de la suppression de l'entreprise par ID: ${error.message}` });
      }
    } else {
      // Sinon, traitez-le comme un nom
      try {
        const deleteResult = await deleteCompaniesByName(identifier);
        res.status(200).json({ message: `Entreprise supprimée avec le nom ${identifier}.`, deleteResult });
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

    const db = client.db(dbName);

    // Collections
    const companiesCollection = db.collection('Companies');
    const invoicesCollection = db.collection('Invoices');
    const contactsCollection = db.collection('Contacts');

    // Suppression de la compagnie
    const deletedCompany = await companiesCollection.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedCompany.value) {
      throw new Error('Entreprise non trouvée');
    }

    // Suppression des documents associés dans la collection Invoices
    const invoicesDeleteResult = await invoicesCollection.deleteMany({ companyId: new ObjectId(id) });
    console.log(`${invoicesDeleteResult.deletedCount} documents deleted from Invoices collection`);

    // Suppression des documents associés dans la collection Contacts
    const contactsDeleteResult = await contactsCollection.deleteMany({ companyId: new ObjectId(id) });
    console.log(`${contactsDeleteResult.deletedCount} documents deleted from Contacts collection`);

    return deletedCompany.value;
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

    return deletedCompany;
  } catch (error) {
    throw new Error(`Erreur du serveur : ${error.message}`);
  }
};


// Update of one company

const updateCompany = async (req, res) => {
  const id = req.params.id;
  const maxLen = 25;

  try {
    const name = req.body.name; // Récupérer directement la valeur de 'name' depuis req.body
   
    if (!name) {
      return res.status(400).json({ message: "Company name not found" });
    }

    // Vérification de la longueur du nom
    if (name.length > maxLen) {
      return res.status(400).json({ message: "Name too long, max allowed is 25 characters" });
    }

    // Mettre à jour la compagnie
    const updatedCompany = await Companies.findByIdAndUpdate(id, { name: name, updatedOn : new Date()}, { new: true });

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
