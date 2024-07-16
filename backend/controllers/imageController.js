import { uploadContactImage, uploadUserImage } from "../utils/imageUploader.js";

const saveContactImage = (req, res) => {
  const id = req.params.contactId;
  // Use multer middleware to handle image upload
  uploadContactImage.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.send("Contact image uploaded successfully");
  });
};

export { saveContactImage };
