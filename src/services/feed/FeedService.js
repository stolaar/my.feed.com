const Scrapper = require('../scrapper/Scrapper')
const {FeedConfigurationRepository, PostsRepository, UserRepository} = require('../../models/repositories/index')
const mockPosts = require('../../mock/posts.json')
const isEmpty = require('lodash.isempty')
const BadRequest = require('../../errors/BadRequest')

class FeedService {
    constructor(scrapper = new Scrapper(),
                feedConfigurationRepository = FeedConfigurationRepository,
                postsRepository = PostsRepository ,
                usersRepository = UserRepository) {
        this.scrapper = scrapper
        this.feedConfigurationRepository = feedConfigurationRepository
        this.postsRepository = postsRepository
        this.usersRepository = usersRepository
    }

    async fetchPosts() {
        const configurations = await this.feedConfigurationRepository.getAll()
        console.log('configurations', configurations)
        const posts = await this.postsRepository.findFromConfigurations(configurations.map(config => +config.feed_configuration_id))
        return posts.reduce((acc, curr) => {
            const categoryIndex = acc.findIndex(val => val.label === curr['configuration.label'])
            if(categoryIndex > -1) {
                acc[categoryIndex].posts = [...acc[categoryIndex].posts, curr]
            } else {
                acc.push({label: curr['configuration.label'], posts: [curr]})
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
}

module.exports = FeedService
