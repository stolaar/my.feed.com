const {FeedSelectors, FeedConfiguration} = require('../definitions/index')

class FeedConfigurationRepository {
    constructor(model = FeedConfiguration) {
        this.model = model
    }

    drop() {
        return this.model.drop()
    }

    add(values) {
        return this.model.create(values)
    }

    findToken(token) {
        return this.model.selectAll({where: {token}})
    }

    remove(token) {
        return this.model.remove({
            where: {token}
        })
    }

    async findById(configId) {
        return this.model.findOne({where: {feed_configuration_id: configId}, include: {
            model: FeedSelectors,
                as: 'selectors'
            }})
    }

    async getAll() {
        return this.model.findAll({
            include: {
                model: FeedSelectors,
                as: 'selectors'
            }

        })
    }
}

module.exports = FeedConfigurationRepository
