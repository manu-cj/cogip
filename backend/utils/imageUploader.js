import multer from "multer";
import path from "path";

const contactStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/people/users/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadContactImage = multer({ storage: contactStorage });

export default uploadContactImage;
