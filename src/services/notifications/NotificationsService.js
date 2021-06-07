const sendEmail = require('../../jobs/email/sendEmail')
const parseTemplate = require('../../utils/html/parseTemplate')
const path = require('path')
const {services: {notification}} = require('../../constants/appStrings')
const loadTemplate = require('../../utils/html/loadTemplate')

class NotificationsService {
    constructor(_sendEmail = sendEmail) {
        this.sendEmail = _sendEmail
        this.recepient = process.env.NOTIFICATIONS_RECEIPT_EMAIL || 'astolic@banzae.dev'
    }

    async userRegistered(data) {
        console.log('user registered')
        const template = loadTemplate(path.join(global.appRoot, 'src/templates/userRegistered.html'))
        const templateHTML = parseTemplate(template, data)

        return this.sendEmail({
            recepient: this.recepient,
            subject: notification.userRegistered.subject,
            body: templateHTML,
        })
    }
}

module.exports = NotificationsService
