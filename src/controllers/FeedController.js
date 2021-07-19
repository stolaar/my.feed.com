const BaseController = require("./BaseController")
const FeedService = require("../services/feed/FeedService")

class AuthController extends BaseController {
    constructor(feedService = new FeedService()) {
        super()
        this.feedService = feedService
    }

    async getPosts(req, res, next) {
        try {
            const {user: {id}} = req
            const posts = await this.feedService.fetchPosts(id)
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
}

module.exports = AuthController
