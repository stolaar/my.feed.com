const bcrypt = require("bcryptjs")
const keys = require('../../config/keys')
const {User, UserConfiguration, FeedSelectors, FeedConfiguration} = require('../definitions/index')
const db = require('../db')

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
        return this.model.findOne({
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
}

module.exports = UserRepository
