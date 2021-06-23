const TokensRepository = require('./TokensRepository')
const UserRepository = require('./UserRepository')
const UserRolesRepository = require('./UserRolesRepository')
const db = require('../db')

module.exports = {
    TokensRepository: new TokensRepository(db.tokens),
    UserRepository: new UserRepository(db.users),
    UserRolesRepository: new UserRolesRepository(db.userRoles)
}
