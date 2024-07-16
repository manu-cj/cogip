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
  if (!name || !companyId || !email || !phoneNr) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
    });
  }
  name = sanitize(name);
  email = sanitize(email);
  phoneNr = sanitize(phoneNr);
  const maxLen = 50;
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
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  let { name, email, phoneNr } = req.body;
  if (!name || !email || !phoneNr) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
    });
  }
  name = sanitize(name);
  email = sanitize(email);
  phoneNr = sanitize(phoneNr);
  if (!name || !email || !phoneNr) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
    });
  }
  const maxLen = 50;
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
    const modifiedContact = await Contact.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        phoneNr: phoneNr,
      },
      { new: true }
    );

    if (!modifiedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res
      .status(200)
      .json({
        message: "Contact successfully updated",
        contact: modifiedContact,
      });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR ${error.message}` });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

export {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
