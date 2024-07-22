import express from "express";
const router = express.Router();
import {
  getContacts,
  createContact,
  getContactById,
  getLatestContacts,
  updateContact,
  deleteContact,
  getContactsByCompany,
  getPaginatedContacts,
  getContactsByName,
} from "./../controllers/contactController.js";

// GET ROUTES
router.get("/", getContacts);
router.get("/latest", getLatestContacts);
router.get("/pagination/:nbPerPage/:page?", getPaginatedContacts);
router.get("/name/:name", getContactsByName);
router.get("/:id", getContactById);
router.get("/company/:companyId", getContactsByCompany);

// POST ROUTES
router.post("/", createContact);

// PATCH ROUTES
router.patch("/:id", updateContact);

// DELETE ROUTES
router.delete("/:id", deleteContact);

export default router;
