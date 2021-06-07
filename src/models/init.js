const bcrypt = require("bcryptjs")
const keys = require('../config/keys')
const {roles, rbacConfig} = require('../config/roles')
const RBAC = require('../services/rbac/RBACService')
const rbacService = new RBAC(rbacConfig)
const sql = require('./sql').users

async function initAdmin(db) {
    try {
        const existing = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [keys.admin.initEmail])
        if(existing) return null
        const password = await bcrypt.hash(keys.admin.initPassword, 10)

        const user = await db.one(sql.createUser, {email: keys.admin.initEmail, password, name: 'Admin'})
        await rbacService.addUserRoles(user.user_id, [roles.superAdmin])
        return user
    } catch (err) {
        console.error('err', err)
        throw err
    }
}

module.exports = {initAdmin}
