import express from "express";
const router = express.Router();
import {
  getCompanies,
  getCompaniesById,
  getLatestCompanies,
  getPaginatedCompanies,
  postCompanies,
  deleteCompany,
  updateCompany,
} from "./../controllers/companiesController.js";



// GET ROUTES

// Routes protégées par rôle
router.get("/", getCompanies);
router.get("/latest", getLatestCompanies);
router.get("/:id", getCompaniesById);
router.get("/pagination/:nbPerPage/:page?", getPaginatedCompanies);

//POST ROUTES
router.post("/", postCompanies);

//DELETE ROUTES
router.delete("/:identifier", deleteCompany);

//Update ROUTES
router.patch("/:id",updateCompany);
export default router;
