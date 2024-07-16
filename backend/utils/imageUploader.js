import multer from "multer";

const allowedFileTypes = ["image/jpeg", "image/png"];

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

const uploadContactImage = multer({
  storage: contactStorage,
  fileFilter: function (req, file, cb) {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG images are allowed"));
    }
  },
});
const uploadUserImage = multer({
  storage: userStorage,
  fileFilter: function (req, file, cb) {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG images are allowed"));
    }
  },
});

export { uploadContactImage, uploadUserImage };
