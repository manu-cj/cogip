import express from "express";
const router = express.Router();
import {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "./../controllers/contactController.js";

// GET ROUTES
router.get("/", getContacts);
router.get("/:id", getContactById);

// POST ROUTES
router.post("/", createContact);

// PATCH ROUTES
router.patch("/:id", updateContact);

// DELETE ROUTES
router.delete("/:id", deleteContact);

export default router;
