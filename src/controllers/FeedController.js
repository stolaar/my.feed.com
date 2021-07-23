const BaseController = require("./BaseController")
const FeedService = require("../services/feed/FeedService")

class AuthController extends BaseController {
    constructor(feedService = new FeedService()) {
        super()
        this.feedService = feedService
    }

    async getPosts(req, res, next) {
        try {
            const posts = await this.feedService.fetchPosts()
            return res.status(200).send(posts)
        } catch (err) {
            next(err)
        }
    }

    async scrapePosts(req, res, next) {
        try {
            const {configuration_id} = req.body
            const posts = await this.feedService.scrapeFromConfiguration(configuration_id)
            return res.status(200).send(posts)
        } catch (err) {
            next(err)
        }
    }

    async getCategoryPosts(req, res, next) {
        try {
            const {params: {category}, query} = req
            const posts = await this.feedService.getCategoryPosts(category, query)
            return res.status(200).send(posts)
        } catch (err) {
            next(err)
        }
    }

    async searchPosts(req, res, next) {
        try {
            const {query: {page = 1, search = ''}} = req
            const posts = await this.feedService.searchPosts({page, search})
            return res.status(200).send(posts)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController
