import express from "express";
const router = express.Router();
import {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "./../controllers/contactController.js";

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
