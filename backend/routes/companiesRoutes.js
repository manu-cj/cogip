import express from "express";
const router = express.Router();
import {
  getCompanies,
  postCompanies,
  deleteCompany
} from "./../controllers/companiesController.js";

// GET ROUTES
router.get("/", getCompanies);

//POST ROUTES
router.post("/", postCompanies);

//DELETE ROUTES
router.delete("/:identifier", deleteCompany);
export default router;
