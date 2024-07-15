import express from "express";
const router = express.Router();
import { createUser, getUsers } from "./../controllers/userController.js";

// GET ROUTES
router.get("/", getUsers);
router.post("/", createUser);

export default router;
