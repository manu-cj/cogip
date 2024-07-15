import express from "express";
const router = express.Router();
import {getCompanies} from "./../controllers/companiesController";

// GET ROUTES
router.get("/", getCompanies);
export default router;
