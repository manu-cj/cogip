import Invoice from "./../models/invoiceModel.js";
import Companies from "./../models/companiesModel.js";
import { sanitize } from "./../utils/sanitize.js";

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("companyId", "name");
    if (!invoices) {
      return res.status(404).json({ message: "No invoices found." });
    }
    return res.status(200).json({ invoices });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR : ${message.error}` });
  }
};

const createInvoice = async (req, res) => {
  let { reference, companyId } = req.body;
  const maxLength = 50;
  try {
    const foundRef = await Invoice.findOne({ reference: reference });
    const foundCompany = await Companies.findById(companyId);
    if (foundRef) {
      return res.status(400).json({
        message: "This invoice reference already exists. You monkey!!!",
      });
    }
    if (!foundCompany) {
      return res
        .status(404)
        .json({ message: "Company not found. Make sure to send a valid ID" });
    }
    reference = sanitize(reference);
    if (!reference || reference.length > maxLength) {
      return res.status(400).json({
        message: "Please make sure to add a ref of max 50 chars.",
      });
    }
    const invoice = new Invoice({ reference, companyId });
    invoice.save();
    return res
      .status(200)
      .json({ message: "Successfully created invoice", invoice });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR : ${error.message}` });
  }
};

const updateInvoice = async (req, res) => {
  // TO DO
};

const deleteInvoice = async (req, res) => {
  // TO DO
};

const getInvoiceById = async (req, res) => {
  // TO DO
};

export {
  getInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
  updateInvoice,
};
