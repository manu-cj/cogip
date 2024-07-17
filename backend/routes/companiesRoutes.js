import express from "express";
const router = express.Router();
import {
  getCompanies,
  postCompanies,
  deleteCompany,
  updateCompany
} from "./../controllers/companiesController.js";

// GET ROUTES
router.get("/", getCompanies);

//POST ROUTES
router.post("/", postCompanies);

//DELETE ROUTES
router.delete("/:identifier", deleteCompany);

//Update ROUTES
router.patch("/", updateCompany);
export default router;
