const { Stories, Posts } = require('../definitions/index')

class StoriesRepository {
    static _instance
    constructor(model) {
        this.model = model || Stories
    }

    static get() {
        if(!this._instance) {
            this._instance = new StoriesRepository()
        }
        return this._instance
    }

    drop() {
        return this.model.drop()
    }

    add(values) {
        return this.model.create(values)
    }

    remove(id) {
        return this.model.remove({
            where: { story_id: id }
        })
    }

    async findById(storyId) {
        return this.model.findOne({where: {story_id: storyId}, include: {
                model: Posts,
                as: 'posts'
            }})
    }

    async getAll() {
        return this.model.findAll({
            include: {
                model: Posts,
                as: 'posts'
            }

        })
    }

    async getAllStories() {
        return this.model.findAll()
    }
}

module.exports = StoriesRepository
