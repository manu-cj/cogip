import express from "express";
const router = express.Router();
import {
  getCompanies,
  getCompaniesById,
  postCompanies,
  deleteCompany,
  updateCompany,
} from "./../controllers/companiesController.js";

// GET ROUTES
router.get("/", getCompanies);
router.get("/:id", getCompaniesById);

//POST ROUTES
router.post("/", postCompanies);

//DELETE ROUTES
router.delete("/:identifier", deleteCompany);

//Update ROUTES
router.patch("/:id", updateCompany);
export default router;
