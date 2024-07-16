import express from "express";
import {
  saveContactImage,
  saveUserImage,
} from "./../controllers/imageController.js";

const router = express.Router();

router.patch("/contacts/:contactId", saveContactImage);

router.patch("/users/:userId", saveUserImage);

export default router;
