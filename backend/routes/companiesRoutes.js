import express from "express";
const router = express.Router();
import {getCompanies} from "./../controllers/companiesController.js";

// GET ROUTES
router.get("/", getCompanies);


//POST ROUTES 
// router.post("/", postCompanies);
export default router;
