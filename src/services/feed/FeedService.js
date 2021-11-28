const Scrapper = require('../scrapper/Scrapper')
const {FeedConfigurationRepository, PostsRepository, StoriesRepository} = require('../../models/repositories/index')
const isEmpty = require('lodash.isempty')
const BadRequest = require('../../errors/BadRequest')
const stringSimilarity = require("string-similarity")

class FeedService {
    constructor(scrapper = new Scrapper(),
                feedConfigurationRepository = FeedConfigurationRepository,
                postsRepository = PostsRepository,
                storiesRepository = StoriesRepository) {
        this.scrapper = scrapper
        this.feedConfigurationRepository = feedConfigurationRepository
        this.postsRepository = postsRepository
        this.storiesRepository = storiesRepository
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

        const {feed_configuration_id,posts} = await (config.is_frontend_app
            ? this.scrapper.scrapeWithPuppeteer(config) : this.scrapper.scrapeWithCheerio(config))

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

    async createOrUpdateStory(posts = []) {
        const stories = await this.storiesRepository.getAllStories()
        const storyTitles =  ["Тест: Проверете колку сте"] //stories.map(story => story.title)
        console.log('Story titles', storyTitles)

        const matches = posts.map(post => {
            const similarity = stringSimilarity.findBestMatch(post.title, storyTitles)
            const storyTitle = similarity.bestMatch.rating > 0.6 ? similarity.bestMatch.target : post.title
            if(!storyTitles.includes(storyTitle))
                storyTitles.push(storyTitle)

            return { ...post, story_title: storyTitle, story_id: stories
                    .find(story => story.title === storyTitle)?.story_id || null }
        })
        // TODO CREATE STORIES
        console.log(matches)
    }

}

module.exports = FeedService
