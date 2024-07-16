import multer from "multer";
import path from "path";

const maxFileSize = 5 * 1024 * 1024;
const suspiciousExtensions = [".exe", ".sh", ".bat"];
const allowedExtensions = [".jpg", ".jpeg", ".png"];

const contactStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/img/people/contacts");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/img/people/users");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error("Only JPEG and PNG images are allowed"));
  }
  if (
    suspiciousExtensions.some((ext) =>
      file.originalname.toLowerCase().includes(ext)
    )
  ) {
    return cb(new Error("Suspicious file detected"));
  }
  cb(null, true);
};

const uploadContactImage = multer({
  storage: contactStorage,
  limits: { fileSize: maxFileSize },
  fileFilter: fileFilter,
});

const uploadUserImage = multer({
  storage: userStorage,
  limits: { fileSize: maxFileSize },
  fileFilter: fileFilter,
});

export { uploadContactImage, uploadUserImage };
