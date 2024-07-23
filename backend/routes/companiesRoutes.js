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
import { checkPermission } from './../middleware/checkPermission.js';


// GET ROUTES

// Routes protégées par rôle
router.get("/", checkPermission('user', 'admin', 'superAdmin'), getCompanies);
router.get("/latest", checkPermission('user', 'admin', 'superAdmin'), getLatestCompanies);
router.get("/:id", checkPermission('user', 'admin', 'superAdmin'), getCompaniesById);
router.get("/pagination/:nbPerPage/:page?", checkPermission('user', 'admin', 'superAdmin'), getPaginatedCompanies);

//POST ROUTES
router.post("/", checkPermission('admin','superadmin','post'),postCompanies);

//DELETE ROUTES
router.delete("/:identifier", checkPermission('superadmin','delete'),deleteCompany);

//Update ROUTES
router.patch("/:id", checkPermission('admin','superadmin','post'),updateCompany);
export default router;
