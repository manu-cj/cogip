import mongoose from "mongoose";
import { hashPassword, comparePassword } from "./utils/managePasswords.js";
import User from "./models/userModel.js";

// returns list of all users
const getUsers = async (req, res) => {};

console.log(hashPassword("fooooooo"));

export default { getUsers };
