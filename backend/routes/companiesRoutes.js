import express from "express";
const router = express.Router();
import {
  getCompanies,
  postCompanies,
  deleteCompanies,
} from "./../controllers/companiesController.js";

// GET ROUTES
router.get("/", getCompanies);

//POST ROUTES
router.post("/", postCompanies);

//DELETE ROUTES
router.delete("/:name", deleteCompanies);
export default router;
