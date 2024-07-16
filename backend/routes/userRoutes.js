import express from "express";
const router = express.Router();
import {
  createUser,
  getUsers,
  login,
  getUserById,
} from "./../controllers/userController.js";

// GET ROUTES
router.get("/", getUsers);
router.get("/:id", getUserById);

// POST ROUTES
router.post("/", createUser);
router.post("/login", login);

export default router;
