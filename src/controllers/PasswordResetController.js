const BaseController = require('./BaseController')
const PasswordResetService = require('../services/passwordReset/PasswordResetService')
const passwordResetService = new PasswordResetService()
class PasswordResetController extends BaseController {
  constructor(req, res, next) {
    super(req, res, next)
  }

  async passwordResetRequest() {
    try {
      const {
        body: { email },
        appUrl
      } = this._req
      await passwordResetService.passwordReset(email,appUrl)
      return this.ok()
    } catch (err) {
      this._next(err)
    }
  }

  async passwordResetRedirect() {
    try {
      const {
        user,
        body: { password, password2 }
      } = this._req
      await passwordResetService.passwordResetRedirect(
        password,
        password2,
        user
      )
      return this.ok()
    } catch (err) {
      this._next(err)
    }
  }
}

module.exports = PasswordResetController
