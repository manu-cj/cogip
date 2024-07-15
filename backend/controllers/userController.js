import mongoose from "mongoose";
import { hashPassword, comparePasswords } from "./../utils/managePasswords.js";
import User from "./../models/userModel.js";

// returns list of all users
const getUsers = async (req, res) => {
  console.log("TEST");
};

export { getUsers };
