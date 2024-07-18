import express from "express";
import {
  getInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
  getLatestInvoices,
  getInvoicesByCompany,
  getPaginatedInvoices,
} from "./../controllers/invoiceController.js";

const router = express.Router();

// GET ROUTES
router.get("/", getInvoices);
router.get("/latest", getLatestInvoices);
router.get("/:id", getInvoiceById);
router.get("/pagination/:nbPerPage/:page?", getPaginatedInvoices);
router.get("/company/:companyId", getInvoicesByCompany);

// POST ROUTES
router.post("/", createInvoice);

// PATCH ROUTES
// router.patch("/:id", updateInvoice); -> No use for now

// DELETE ROUTES
router.delete("/:id", deleteInvoice);

export default router;
