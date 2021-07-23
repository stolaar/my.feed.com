const express = require('express')
const router = express.Router()
const FeedController = require("../../../controllers/FeedController")

const feedController = new FeedController()
const passport = require('passport')

// @route GET /api/feed/categories
// @desc Get user posts
// @access Public
router.get('/categories', (req, res, next) => feedController.getCategories(req, res, next))

// @route POST /api/feed/scrape-posts
// @desc Scrape configuration posts
// @access Private
router.post('/scrape-posts', (req, res, next) => feedController.scrapePosts(req, res, next))

// @route GET /api/feed/:category
// @desc Get user posts
// @access Public
router.get('/search', (req, res, next) => feedController.searchPosts(req, res, next))

// @route GET /api/feed/:category
// @desc Get user posts
// @access Public
router.get('/:category', (req, res, next) => feedController.getCategoryPosts(req, res, next))

module.exports = router
