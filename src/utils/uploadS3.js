const AWS = require('aws-sdk')
const { S3_ACCESS_KEY = "", S3_SECRET_KEY = "", S3_BUCKET, MAX_UPLOAD_SIZE } = process.env
let s3Bucket = S3_BUCKET || ""
const spacesEndpoint = new AWS.Endpoint(s3Bucket);
const multer = require("multer");
const multerS3 = require("multer-s3");
const Uuid = require("node-time-uuid");

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    s3BucketEndpoint: true
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

const uploadS3 = multer({
    fileFilter,
    limits: { fileSize: 1024 * 1024 * MAX_UPLOAD_SIZE },
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: s3Bucket.replace("https://", "").split(".")[0], // WORKAROUND FOR GETTING THE BUCKET NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, Object.assign({}, req.body));
      },
      key: async function (req, file, cb) {
         cb(null, new Uuid().toString().substring(0, 3) + '/' + Date.now().toString());
      },
    }),
  });

module.exports = uploadS3;
