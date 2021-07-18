const BadRequest = require('../../errors/BadRequest')
const isEmpty = require("lodash.isempty")
const ValidationService = require("../validation/ValidationService")
const bcrypt = require("bcryptjs")
const {UserRolesRepository, UserRepository} = require('../../models/repositories')

class UserService {
  constructor(validationService = new ValidationService(),
              userRolesRepository = UserRolesRepository,
              usersRepository = UserRepository) {
    this.validationService = validationService
    this.userRolesRepository = userRolesRepository
    this.usersRepository = usersRepository
  }

  getUserRoles(userId) {
    return this.userRolesRepository.getUserRoles(userId)
  }

  getAllUsers() {
    return this.usersRepository.all()
  }

  async getUserByEmail(email) {
    return await this.usersRepository.findByEmail(email)
  }

  getUserByExternalId(id_label, id) {
    return this.usersRepository.getUserByExternalId(id_label, id)
  }

  createUser(user, provider = null) {
    return this.usersRepository.addUser(user, provider)
  }

  getUserById(id) {
    return this.usersRepository.findById(id)
  }

  async isUserRegistered(email) {
    let user = await this.getUserByEmail(email)
    return !isEmpty(user)
  }

  addUserRole(role, user_id) {
    return this.userRolesRepository.addRole({ role, user_id })
  }

  updatePassword(password = '', userId) {
    return this.usersRepository.updatePassword(password, userId)
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

    return this.usersRepository.updateUser(data, user.id)
  }

  async getConfigurations(userId) {
    return this.usersRepository.getConfigurations(userId)
  }

  async createConfiguration(userId, body) {
    return this.usersRepository.createConfiguration(userId, body)
  }
}

module.exports = UserService
