const express = require('express')
const router = express.Router()
const AuthController = require("../../../controllers/AuthController")
const decodeAndVerifyJwt = require('../../../middlewares/decodeAndVerifyJwt')
const PasswordResetController = require('../../../controllers/PasswordResetController')
const authController = new AuthController()

// @route POST /api/auth/login
// @desc Users login
// @access Public
router.post('/login', (req, res, next) => authController.login(req, res, next))

// @route POST /api/auth/register/redirect
// @desc Register user
// @access Public
router.post('/register/redirect', decodeAndVerifyJwt, (req, res, next) => authController.register(req, res, next))

// @route POST /api/auth/register
// @desc Sending a register request
// @access Public
router.post('/register', (req, res, next) => authController.registerRequest(req, res, next))

// @route POST /api/password-reset
// @desc Sends password reset email
// @access Private
router.post('/password-reset', (req, res, next) =>
  new PasswordResetController(req, res, next).passwordResetRequest()
)

// @route POST /api/password-reset/redirect
// @desc Sends password reset email
// @access Private
router.post('/password-reset/redirect', decodeAndVerifyJwt, (req, res, next) =>
  new PasswordResetController(req, res, next).passwordResetRedirect()
)

module.exports = router
