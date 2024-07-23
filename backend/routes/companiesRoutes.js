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

import authorize from './../controllers/middleware/rolepermission.js'

// GET ROUTES
router.get("/", authorize('get'),getCompanies);
router.get("/latest", authorize('get'),getLatestCompanies);
router.get("/:id", authorize('get'),getCompaniesById);
router.get("/pagination/:nbPerPage/:page?", authorize('get'),getPaginatedCompanies);

//POST ROUTES
router.post("/", authorize('post'),postCompanies);

//DELETE ROUTES
router.delete("/:identifier", authorize('delete'),deleteCompany);

//Update ROUTES
router.patch("/:id", authorize('patch'),updateCompany);
export default router;
