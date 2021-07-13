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
}

module.exports = AuthController
