const FeedConfiguration= require('../definitions/FeedConfiguration')

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
}

module.exports = FeedConfigurationRepository
