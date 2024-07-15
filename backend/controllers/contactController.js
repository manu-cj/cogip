import Contact from "./../models/contactModel.js";
import mongoose from "mongoose";
import { sanitize, validateEmail } from "./../utils/sanitize.js";

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

const createContact = async (req, res) => {
  let { name, email, companyId } = req.body;
  const maxLen = 50;
  firstName = sanitize(firstName);
  lastName = sanitize(lastName);
  email = sanitize(email);
  password = sanitize(password);
  if (!firstName || !lastName || !password) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
    });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Invalid email address.",
    });
  }
  if (
    firstName.length > maxLen ||
    lastName.length > maxLen ||
    email.length > maxLen
  ) {
    return res.status(400).json({
      message: "Invalid request, max input length : 50 chars.",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await hashPassword(password);
    let user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    user.save();
    return res.status(201).json({ message: "Registration successful" });
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

export { getContacts, createContact };
