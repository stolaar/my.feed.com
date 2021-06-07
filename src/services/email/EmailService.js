const sendEmail = require('../../jobs/email/sendEmail')
const {CONFIRMATION_EMAIL_OVERRIDE} = process.env

class EmailService {
  constructor(emailOpts = { recepient: '', attachments: [] }) {
    this.emailOpts = emailOpts
  }

  sendRegisterConfirmationLink(opts = { confirmationLink: '', recepient: '' }) {
    return sendEmail({
      ...this.emailOpts,
      recepient: CONFIRMATION_EMAIL_OVERRIDE || opts.recepient,
      subject: 'Dashboard - Confirm your account',
      body: opts.body || `<p>Click on the link below to confirm your account: </p> <a href="${opts.confirmationLink}">Confirm account</a>`
    })
  }

  sendPasswordResetLink({ link = '', recepient = '', body }) {
    return sendEmail({
      ...this.emailOpts,
      recepient: recepient,
      subject: 'Dashboard - Password reset',
      body: body || `<p>Click on the link below to reset your password: </p> <a href="${link}">Reset password</a>`
    })
  }
}

module.exports = EmailService
