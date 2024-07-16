import express from "express";
import { saveContactImage } from "./../controllers/imageController.js";

const router = express.Router();

router.patch("/contacts/:contactId", saveContactImage);

// router.post("/users/:userId", uploadUserImage.single("image"), (req, res) => {
//   // Handle successful upload
//   res.send("User image uploaded successfully");
// });

export default router;
