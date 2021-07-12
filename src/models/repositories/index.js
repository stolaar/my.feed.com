const TokensRepository = require('./TokensRepository')
const UserRepository = require('./UserRepository')
const UserRolesRepository = require('./UserRolesRepository')
const Token = require('../definitions/Tokens')
const User = require('../definitions/User')
const UserRoles = require('../definitions/UserRoles')

module.exports = {
    TokensRepository: new TokensRepository(Token),
    UserRepository: new UserRepository(User),
    UserRolesRepository: new UserRolesRepository(UserRoles)
}
