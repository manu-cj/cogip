import mongoose from "mongoose";
import User from "./../models/userModel.js";
import { hashPassword, comparePasswords } from "./../utils/managePasswords.js";
import { sanitize, validateEmail } from "./../utils/sanitize.js";

// returns list of all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

// returns user obj based on their id
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

// Checks if login data is correct + returns user data if login OK
const login = async (req, res) => {
  let { email, password } = req.body;
  email = sanitize(email);
  password = sanitize(password);
  if (!email || !password) {
    return res.status(400).json({
      message: "Invalid request, missing email and/or password.",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with that email address" });
    }
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR : ${error.message}` });
  }
};

// Creates a new user within DB
const createUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !password) {
    return res.status(400).json({
      message: "Invalid request, please make sure all parameters are sent.",
    });
  }
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

// Maybe add an update route also. Not sure why it would be needed for now.

export { getUsers, createUser, login, getUserById };
