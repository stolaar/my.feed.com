const express = require('express')
const router = express.Router()
const UsersController = require("../../../controllers/UsersController")

const usersController = new UsersController()
const passport = require('passport')

// @route GET /api/users/configurations
// @desc Get user configurations
// @access Public
router.get('/configurations', passport.authenticate('jwt'), (req, res, next) => usersController.getConfigurations(req, res, next))

// @route POST /api/users/configurations
// @desc Add users configuration
// @access Public
router.post('/configuration', passport.authenticate('jwt'), (req, res, next) => usersController.createConfiguration(req, res, next))

module.exports = router
