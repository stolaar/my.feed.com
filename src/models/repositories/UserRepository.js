const sql = require('../sql').users
const bcrypt = require("bcryptjs")
const keys = require('../../config/keys')
const RBAC = require('../../services/rbac/RBACService')
const rbacService = new RBAC()
const {roles} = require('../../config/roles')

// TODO: MOVE THE QUERIES TO RESPECTIVE SQL FILE
class UserRepository {
    constructor(db, pgp) {
        this.db = db
        this.pgp = pgp
    }

    getAll() {
        return this.db.any(sql.getAll)
    }

    drop() {
        return this.db.any(sql.drop)
    }

    findByIdAndEmail(id, email) {
        return this.db.oneOrNone(sql.findByIdAndEmail, [id, email])
    }

    findByEmail(email) {
        return this.db.oneOrNone(sql.findByEmail, [email])
    }

    updatePassword(password, id) {
        return this.db.oneOrNone('UPDATE users SET password = $1 WHERE user_id = $2', [password, +id])
    }

    getUserByExternalId(provider, id) {
        return this.db.oneOrNone(`SELECT * FROM users WHERE ${provider} = $1`, id)
    }

    findById(id) {
        return this.db.oneOrNone(sql.findById, [id])
    }

    async findByUsername(podcast_username) {
        return await this.db.oneOrNone(sql.findByUsername, [podcast_username])
    }

    async createUser(values) {
        const userData = { ...values }
        return await this.db.one(sql.createUser, userData)
    }

    async initAdmin() {

        // const existing = await this.db.oneOrNone('SELECT * FROM users WHERE email = $1', [keys.admin.initEmail])
        // if(existing) return null
        const password = await bcrypt.hash(keys.admin.initPassword, 10)
        console.log('password', password)
        // const user = await this.db.one(sql.createUser, {email: keys.admin.initEmail, password, name: 'Admin'})
        await rbacService.addUserRoles(1, [roles.superAdmin])
    }
}

module.exports = UserRepository
