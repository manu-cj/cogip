import express from "express";
const router = express.Router();
import {
  getContacts,
  createContact,
} from "./../controllers/contactController.js";

router.get("/", getContacts);
router.post("/", createContact);

export default router;
