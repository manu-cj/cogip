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

export { createRole };
