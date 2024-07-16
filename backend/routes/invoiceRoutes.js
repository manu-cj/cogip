import express from "express";
import {
  getInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
  updateInvoice,
} from "./../controllers/invoiceController.js";

const router = express.Router();

// GET ROUTES
router.get("/", getInvoices);
router.get("/", getInvoiceById);

// POST ROUTES
router.post("/", createInvoice);

// PATCH ROUTES
router.patch("/:id", updateInvoice);

// DELETE ROUTES
router.delete("/:id", deleteInvoice);

export default router;
