const fs = require("fs");
const Uuid = require("node-time-uuid");
const { ErrorHandler } = require("../helpers/error");
const path = require("path");
const uploadPath = "./public/";

const checkUploadPath = (req, res, next) => {
  const imageUuid = new Uuid();
  const imageDir = imageUuid.toString().substring(0, 3);
  const basePath = uploadPath + '/' + imageDir;
  try {
    fs.exists(basePath, function (exists) {
      req.uploadPath = basePath;
      if (exists) {
        next();
      } else {
        fs.mkdir(basePath, {recursive: true}, function (err) {
          if (err) {
            console.log("Error in folder creation");
            throw new ErrorHandler(
              "FolderCreation",
              400,
              err.message.toString(),
              true
            );
            //next(err);
          }
          next();
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = checkUploadPath;
