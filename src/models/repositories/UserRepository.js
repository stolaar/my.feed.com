const bcrypt = require("bcryptjs")
const keys = require('../../config/keys')

class UserRepository {
    constructor(model) {
        this.model = model
        this.initAdmin()
    }

    getAll() {
        return this.model.selectAll()
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
}

module.exports = UserRepository
