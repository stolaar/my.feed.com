const BadRequest = require('../../errors/BadRequest')
const isEmpty = require("lodash.isempty")
const ValidationService = require("../validation/ValidationService")
const bcrypt = require("bcryptjs")

class UserService {
  constructor(validationService = new ValidationService(), _db = require('../../models/db')) {
    this.validationService = validationService
    this.db = _db
  }

  getUserRoles(userId) {
    return this.db.userRoles.getUserRoles(userId)
  }

  getAllUsers() {
    return this.db.users.all()
  }

  async getUserByEmail(email) {
    return await this.db.users.findByEmail(email)
  }

  getUserByExternalId(id_label, id) {
    return this.db.users.getUserByExternalId(id_label, id)
  }

  createUser(user, provider = null) {
    return this.db.users.addUser(user, provider)
  }

  getUserById(id) {
    return this.db.users.findById(id)
  }

  async isUserRegistered(email) {
    let user = await this.getUserByEmail(email)
    return !isEmpty(user)
  }

  addUserRole(role, user_id) {
    return this.db.userRoles.addRole({ role, user_id })
  }

  updatePassword(password = '', userId) {
    return this.db.users.updatePassword(password, userId)
  }

  async updateUser(data, user) {
    const {errors, isValid} = this.validationService.validateUserUpdate(data)
    if(!isValid) throw new BadRequest(errors)
    let existingUser = await this.getUserByEmail(data.email)
    if(existingUser) {
      if(user.email !== existingUser.email) throw new BadRequest({email: "This email is already in use"})
    }

    if(!isEmpty(data.password)) {
      data.password = await bcrypt.hash(data.password, 12)
    }

    return db.users.updateUser(data, user.id)
  }
}

module.exports = UserService
