import mongoose from "mongoose";
import User from "./../models/userModel.js";
import { hashPassword, comparePasswords } from "./../utils/managePasswords.js";
import { sanitize } from "./../utils/sanitize.js";

// returns list of all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const createUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  const maxLen = 50;
  firstName = sanitize(firstName);
  lastName = sanitize(lastName);
  email = sanitize(email);
  password = sanitize(password);
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
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

export { getUsers, createUser };
