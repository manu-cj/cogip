import Invoice from "./../models/invoiceModel.js";
import Companies from "./../models/companiesModel.js";
import { sanitize } from "./../utils/sanitize.js";
import { isValidDate } from "./../utils/dateValidator.js";
import mongoose from "mongoose";

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
  let { reference, companyId, dueDate } = req.body;
  const maxLength = 50;
  try {
    const foundRef = await Invoice.findOne({ reference: reference });
    const foundCompany = await Companies.findById(companyId);
    if (foundRef) {
      return res.status(400).json({
        message: "This invoice reference already exists. Dummy!!!",
      });
    }
    if (!dueDate) {
      return res.status(400).json({
        message: "Due date is missing.",
      });
    }
    if (!foundCompany) {
      return res
        .status(404)
        .json({ message: "Company not found. Make sure to send a valid ID" });
    }
    if (!isValidDate(dueDate)) {
      return res.status(400).json({
        message: "Due Date does not meet required date format : YYYY-MM-DD",
      });
    }
    const now = Date.now();
    dueDate = new Date(dueDate);
    if (dueDate.getTime() <= now) {
      return res.status(400).json({
        message: "Due Date should be a future date.",
      });
    }
    reference = sanitize(reference);
    if (!reference || reference.length > maxLength) {
      return res.status(400).json({
        message: "Please make sure to add a ref of max 50 chars.",
      });
    }
    const invoice = new Invoice({ reference, companyId });
    await invoice.save();
    return res
      .status(200)
      .json({ message: "Successfully created invoice", invoice });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR : ${error.message}` });
  }
};

const updateInvoice = async (req, res) => {
  // Sort of useless, invoices only have companyId and ref?
};

const deleteInvoice = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }
    return res.status(200).json({ message: "Invoice successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

const getInvoiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const invoice = await Invoice.findById(id).populate("companyId", "name");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid invoice ID" });
    }
    return res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR : ${error.message}` });
  }
};

const getPaginatedInvoices = async (req, res) => {
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
    const totalResults = await Invoice.countDocuments();
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    if (page > totalPages) {
      return res.status(400).json({
        message: `No result found for page ${page}, last page is ${totalPages}`,
      });
    }
    const pageResults = await Invoice.find()
      .limit(resultsPerPage)
      .populate("companyId", "name")
      .skip((page - 1) * resultsPerPage);
    return res.status(200).json({ totalResults, totalPages, pageResults });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

const getLatestInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("companyId", "name");
    return res.status(200).json({ invoices });
  } catch (error) {
    return res.status(500).json({ message: `SERVER ERROR : ${error.message}` });
  }
};

const getInvoicesByCompany = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("companyId", "name");
    return res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

export {
  getInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
  getLatestInvoices,
  getInvoicesByCompany,
  getPaginatedInvoices,
};
