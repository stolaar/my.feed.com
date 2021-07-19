const bcrypt = require("bcryptjs")
const keys = require('../../config/keys')
const {User, UserConfiguration, FeedSelectors, FeedConfiguration, Post} = require('../definitions/index')
const db = require('../db')
const Sequelize = require('sequelize')
const {Op} = require('sequelize')

class UserRepository {
    constructor(model = User) {
        this.model = model
        this.initAdmin()
    }

    drop() {
        return this.model.drop()
    }

    findByIdAndEmail(id, email) {
        return this.model.findOne({where: {user_id: id, email}})
    }

    findByEmail(email) {
        return this.model.findOne({
        attributes: ['email', 'password', 'user_id'],
        where: {email}
        })
    }

    getUserByExternalId(provider, id) {
        return this.model.findOne({where: {user_id: id}})
    }

    findById(id) {
        return this.model.findOne({user_id: id})
    }

    async createUser(values) {
        const userData = { ...values }
        return this.model.create(userData)
    }

    async addUser() {

    }

    updateUser() {

    }

    async initAdmin() {
        const existing = await this.findByEmail(keys.admin.initEmail)
        if(existing) return null
        const password = await bcrypt.hash(keys.admin.initPassword, 10)

        this.createUser({email: keys.admin.initEmail, password, name: 'Admin'})
            .catch(err => console.error(err))
    }

    async getConfigurations(userId) {
        const {configurations} = await this.model.findOne({
            where: {user_id: userId},
            attributes: ['configurations.*'],
            include: [
                {
                    model: FeedConfiguration,
                    as: 'configurations',
                    include: {
                        model: FeedSelectors,
                        as: 'selectors'
                    }
                }
            ]
        })

        const promises = configurations.map(async config => {
            const [{max}] = await Post.findAll({
                where: {
                    feed_configuration_id: config.feed_configuration_id
                },
                attributes: [[Sequelize.fn('max', Sequelize.col('updated_at')), 'max']],
                raw: true
            })


            return {...config.dataValues, lastScrapped: max}
        })
        return Promise.all(promises)
    }

    async createConfiguration(userId, body) {
        return db.transaction(async (t) => {
            const selectors = await FeedSelectors.create({
                wrapper: body.selectors.wrapper,
                article: body.selectors.article,
                title: body.selectors.title,
                description: body.selectors.description,
                image: body.selectors.image,
                link: body.selectors.link,
            }, {transaction: t})

            const configuration = await FeedConfiguration.create({
                uri: body.uri,
                label: body.label,
                feed_selectors_id: selectors.feed_selectors_id
            }, {transaction: t})

            await UserConfiguration.create({
                user_id: userId,
                feed_configuration_id: configuration.feed_configuration_id
            }, {transaction: t})
        })
    }

    async deleteConfiguration(userId, configId) {
        return FeedConfiguration.destroy({where: {feed_configuration_id: configId}})
    }

    async updateConfiguration(userId, configId, body) {
        return db.transaction(async task => {
            await FeedConfiguration.update(body, {
                where: {
                    feed_configuration_id: configId
                }
            }, {transaction: task})
            await FeedSelectors.update(body.selectors, {
                where: {
                    feed_selectors_id: body.selectors.feed_selectors_id
                }
            }, {transaction: task})
        })

    }
}

module.exports = UserRepository
