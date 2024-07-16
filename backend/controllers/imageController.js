import User from "./../models/userModel.js";
import Contact from "./../models/contactModel.js";
import { uploadContactImage, uploadUserImage } from "../utils/imageUploader.js";

const saveContactImage = (req, res) => {
  const id = req.params.contactId;
  uploadContactImage.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageInfo = {
      filename: req.file.filename,
      path: `public/assets/img/people/contacts/${req.file.filename}`,
      originalName: req.file.originalname,
      uploadDate: new Date(),
    };
    try {
      const editedContact = await Contact.findByIdAndUpdate(
        id,
        { image: imageInfo },
        { new: true }
      );
      if (!editedContact) {
        return res.status(404).json({
          message:
            "Could not update contact image. Make sure the contact Id is valid.",
        });
      }
      return res.status(200).json({
        message: "Contact image uploaded successfully",
        contact: editedContact,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "SERVER ERROR: " + error.message });
    }
  });
};

export { saveContactImage };
