const logger = require('../jobs/logger/logger')
const { FeedConfigurationRepository, PostsRepository } = require('../models/repositories/index')
const Scrapper = require('../services/scrapper/Scrapper')
const scrapper = new Scrapper()

async function fetchPosts() {
    logger.info('FETCHING POSTS')
    const configurations = await FeedConfigurationRepository.getAll()
    try {
        const posts = await scrapper.scrapeMultiple(configurations)
        await PostsRepository.bulkCreate(posts)
    } catch (err) {
        logger.error(err)
    }
}

module.exports = [
    {
        executeAt: '*/15 * * * *',
        handler: fetchPosts,
        opts: {
            scheduled: false
        }
    }
]
