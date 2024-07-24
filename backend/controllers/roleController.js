import mongoose from "mongoose";
import Role from "./../models/roleModel.js";

const createRole = async (req, res) => {
  const name = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "Name not found in request body" });
    }
    const role = new Role(name);
    await role.save();
    return res.status(201).json({ message: "Role successfully added." });
  } catch (error) {
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

const getRoles = async (req, res) =>{

  try {
    const role = await Role.find().sort({ name: -1});
    return res.status(200).json({ role });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERROR : ${err.message}` });
  }
}
export { createRole, getRoles };
