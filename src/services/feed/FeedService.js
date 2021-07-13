const Scrapper = require('../scrapper/Scrapper')
const mockPosts = require('../../mock/posts.json')

class FeedService {
    constructor(scrapper = new Scrapper()) {
        this.scrapper = scrapper
    }

    async fetchPosts() {
        // GET POSTS FROM DATABASE
            // IF EMPTY OR 24H OLD
            // GET USER CONFIGURATION
            // SCRAPE
            // SAVE RESULTS
        //RETURN POSTS
        return mockPosts
    }
}

module.exports = FeedService
