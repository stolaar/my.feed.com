const Validator = require('validator')
const isEmpty = require('lodash.isempty')
const bcrypt = require('bcryptjs')
const BadRequest = require('../../errors/BadRequest')

class ValidationService {
  constructor() {}

  isEmail(email) {
    return Validator.isEmail(email)
  }

  isLength(str, opts = { min, max }) {
    return Validator.isLength(str, opts)
  }

  isEqual(str1, str2) {
    return Validator.equals(str1, str2)
  }

  validateLoginBody({ email = '', password = '' }) {
    const errors = {}
    if (!this.isEmail(email)) errors.email = 'Invalid email address'
    if (!this.isLength(password, { min: 6 }))
      errors.password = 'Password should be minimum 6 characters'
    if (!isEmpty(errors)) throw new BadRequest(errors)
  }

  validateRegisterBody({ email = '', password = '' , podcast_username = ''}) {
    const errors = {}
    if (!this.isEmail(email)) errors.email = 'Invalid email address'
    if (!this.isLength(password, { min: 6 }))
      errors.password = 'Password should be minimum 6 characters'

    if (!isEmpty(errors)) throw new BadRequest(errors)
  }

  async comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    if (!isMatch) throw new BadRequest({ password: "Invalid password" }, 'Invalid password')
  }

  compareRawPasswords(password, password2) {
    const isMatch = this.isEqual(password, password2)
    if (!isMatch)
      throw new BadRequest(
        { password2: 'Passwords are not matching' },
        'Passwords are not matching'
      )
  }

  validateUserUpdate(data) {
    return true
  }
}

module.exports = ValidationService
