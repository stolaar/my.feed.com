const BadRequest = require('../../errors/BadRequest')
const UserService = require('../users/UserService')
const EmailService = require('../email/EmailService')
const AuthService = require('../auth/AuthService')
const ValidationService = require('../validation/ValidationService')
const path = require("path");
const loadTemplate = require('../../utils/html/loadTemplate')
const parseTemplate = require('../../utils/html/parseTemplate')
const {services: {auth: authErrorMessages}, common: commonErrors} = require('../../constants/errorMessages')

class PasswordResetService {
  constructor(usersService, emailService, authService, validationService) {
    this.usersService = usersService || new UserService()
    this.emailService = emailService || new EmailService()
    this.authService = authService || new AuthService()
    this.validationService = validationService || new ValidationService()
  }

  async passwordReset(email, url) {
    const user = await this.usersService.getUserByEmail(email)
    if (!user)
      throw new BadRequest({ email: authErrorMessages.userNotExists })
    const token = this.authService.generateAccessToken({
      id: user.user_id,
      email: user.email,
      name: user.name,
    })

    const confirmationLink = url + '/password-reset/' + token
    const template = loadTemplate(path.join(global.appRoot, 'src/templates/passwordReset.html'))
    const templateHTML = parseTemplate(template, {name: user.name, confirmationLink})

    await this.emailService.sendPasswordResetLink({
      link:
        url + '/password-reset/' + token,
      recepient: email,
      body: templateHTML
    })
  }

  async passwordResetRedirect(password, password2, user = {}) {
    this.validationService.compareRawPasswords(password, password2)

    const hash = await this.authService.encryptPassword(password)
    await this.usersService.updatePassword(hash, user.id)
  }
}

module.exports = PasswordResetService
