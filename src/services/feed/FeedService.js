const Scrapper = require('../scrapper/Scrapper')
const {FeedConfigurationRepository, PostsRepository} = require('../../models/repositories/index')
const isEmpty = require('lodash.isempty')
const BadRequest = require('../../errors/BadRequest')

class FeedService {
    constructor(scrapper = new Scrapper(),
                feedConfigurationRepository = FeedConfigurationRepository,
                postsRepository = PostsRepository) {
        this.scrapper = scrapper
        this.feedConfigurationRepository = feedConfigurationRepository
        this.postsRepository = postsRepository
    }

    async getCategories() {
        const configurations = await this.feedConfigurationRepository.getAll()

        return configurations.reduce((acc, curr) => {
            const categoryIndex = acc.findIndex(val => val.label === curr.label)
            if(categoryIndex < 0)  {
                acc.push({label: curr.label, slug: curr.slug})
            }
            return acc
        }, [])
    }

    async scrapeFromConfiguration(configId) {
        const config = await this.feedConfigurationRepository.findById(configId)

        const {feed_configuration_id,posts} = await this.scrapper.scrapeWithCheerio(config)

        if(isEmpty(posts)) {
            throw new BadRequest('No posts found!')
        }
        await this.postsRepository.bulkCreate(posts.map(post => {
            post.feed_configuration_id = feed_configuration_id
            return post
        }))
    }

    async getCategoryPosts(category, query) {
        return this.postsRepository.getCategoryPosts(category, query)
    }

    async searchPosts(query) {
        return this.postsRepository.searchPosts(query)
    }
}

module.exports = FeedService
