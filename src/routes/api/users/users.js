const express = require('express')
const router = express.Router()
const UsersController = require("../../../controllers/UsersController")

const usersController = new UsersController()
const passport = require('passport')

// @route GET /api/users/configurations
// @desc Get user configurations
// @access Private
router.get('/configurations', passport.authenticate('jwt'), (req, res, next) => usersController.getConfigurations(req, res, next))

// @route POST /api/users/configurations
// @desc Add users configuration
// @access Private
router.post('/configuration', passport.authenticate('jwt'), (req, res, next) => usersController.createConfiguration(req, res, next))

// @route DELETE /api/users/configurations
// @desc Delete users configuration
// @access Private
router.delete('/configuration', passport.authenticate('jwt'), (req, res, next) => usersController.deleteConfiguration(req, res, next))

// @route PATCH /api/users/configuration
// @desc Delete users configuration
// @access Private
router.patch('/configuration', passport.authenticate('jwt'), (req, res, next) => usersController.updateConfiguration(req, res, next))

module.exports = router
