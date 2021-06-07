const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { authentication } = keys;

const decodeAndVerifyJwt = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, authentication.jwt.secretOrKey);
      req.user = jwtDecode(token);
      next();
    } catch (err) {
      next(err);
    }
  } else next(err);
};

module.exports = decodeAndVerifyJwt;
