import express from "express";
import { createType } from "../controllers/typeController.js";

const router = express.Router();

router.post("/", createType);

export default router;
