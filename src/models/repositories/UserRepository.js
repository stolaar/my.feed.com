const bcrypt = require("bcryptjs")
const keys = require('../../config/keys')

class UserRepository {
    constructor(model) {
        this.model = model
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

    updatePassword(password, id) {
        // return this.db.oneOrNone('UPDATE users SET password = $1 WHERE user_id = $2', [password, +id])
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
        // const user = await this.db.one(sql.createUser, {email: keys.admin.initEmail, password, name: 'Admin'})
    }
}

module.exports = UserRepository
