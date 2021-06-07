const multer = require("multer");
const path = require("path");
const Uuid = require("node-time-uuid");

const {MAX_UPLOAD_SIZE} = process.env

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.uploadPath);
  },
  filename: function (req, file, cb) {
    const imageUuid = new Uuid();
    cb(null, imageUuid.toString() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav"
  ) {
    cb(null, true);
  } else cb(null, false);
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * MAX_UPLOAD_SIZE },
  fileFilter
});

module.exports = upload;
