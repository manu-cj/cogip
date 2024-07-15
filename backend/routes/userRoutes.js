import express from "express";
const router = express.Router();
import { getUsers } from "./../controllers/userController.js";
import { postCompanies } from "../controllers/companiesController.js";

// GET ROUTES
router.get("/", getUsers);


// POST ROUTES 
router.get("/", postCompanies);
export default router;
