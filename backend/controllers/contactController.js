import Contact from "./../models/contactModel.js";
import mongoose from "mongoose";
import { sanitize } from "./../utils/sanitize.js";

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

const createContact = async (req, res) => {
  let { name, companyId, email, phoneNr } = req.body;
  const maxLen = 50;
  name = sanitize(firstName);
  email = sanitize(email);
  phoneNr = sanitize(phoneNr);
  if (!name || !companyId || !email || !phoneNr) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
    });
  }
  // ADD logic to check if company ID exists.
  if (
    name.length > maxLen ||
    phoneNr.length > maxLen ||
    email.length > maxLen
  ) {
    return res.status(400).json({
      message: "Invalid request, max input length : 50 chars.",
    });
  }
  try {
    let contact = new Contact({
      name,
      companyId,
      email,
      phoneNr,
    });
    contact.save();
    return res.status(201).json({ message: "Contact successfully created" });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR ${error.message}` });
  }
};

const getContactById = async (req, res) => {
  //TO DO
};

const updateContact = async (req, res) => {
  // TO DO
};

const deleteContact = async (req, res) => {
  // TO DO
};

export {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
