import mongoose from "mongoose";
import Type from "./../models/typeModel.js";

const createType = async (req, res) => {
  try {
    const { name } = req.body;
    const type = await new Type({ name });
    type.save();
    return res.status(201).json({ message: "Type saved" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

export { createType };
