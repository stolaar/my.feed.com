const express = require('express')
const router = express.Router()
const FeedController = require("../../../controllers/FeedController")

const feedController = new FeedController()

// @route GET /api/feed
// @desc Get user posts
// @access Public
router.get('/', (req, res, next) => feedController.getPosts(req, res, next))

module.exports = router
