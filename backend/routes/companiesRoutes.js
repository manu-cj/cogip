import express from "express";
const router = express.Router();
import {getCompanies, postCompanies, deleteCompanies, deleteByNameCompanies} from "./../controllers/companiesController.js";

// GET ROUTES
router.get("/", getCompanies);


//POST ROUTES 
router.post("/", postCompanies);

//DELETE ROUTES 
router.delete("/:id", deleteCompanies);
router.delete("/:name", deleteByNameCompanies);
export default router;
