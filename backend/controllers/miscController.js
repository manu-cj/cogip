import mongoose from "mongoose";
import Invoice from "./../models/invoiceModel.js";
import Companies from "./../models/companiesModel.js";
import Contact from "./../models/contactModel.js";

const getStats = async (req, res) => {
  try {
    const totalInvoices = await Invoice.countDocuments();
    const totalCompanies = await Companies.countDocuments();
    const totalContact = await Contact.countDocuments();
    res.status(200).json({ totalInvoices, totalCompanies, totalContact });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR : ${error.message}` });
  }
};

export { getStats };
