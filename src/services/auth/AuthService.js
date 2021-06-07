const db = require('../../models/db')
const {authentication} = require("../../config/keys")
const BadRequest = require('../../errors/BadRequest')
const ValidationService = require("../validation/ValidationService")
const JWTService = require("../jwt/JWTService")
const EmailService = require("../email/EmailService")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const path = require("path");
const Notifications = require('../notifications/NotificationsService')
const RBACService = require('../rbac/RBACService')
const { roles, rbacConfig } = require('../../config/roles')
const {services: {auth: errorMessages}, common: commonErrors} = require('../../constants/errorMessages')
const loadTemplate = require('../../utils/html/loadTemplate')
const parseTemplate = require('../../utils/html/parseTemplate')

class AuthService {
    constructor(usersRepository = db.users,
                validationService = new ValidationService(),
                jwtService = new JWTService(),
                emailService = new EmailService(),
                _notificationsService = new Notifications(),
                rbacService = new RBACService(rbacConfig)) {
        this.usersRepository = usersRepository
        this.validationService = validationService
        this.jwtService = jwtService
        this.emailService = emailService
        this.notificationsService = _notificationsService
        this.rbacService = rbacService
    }

    async login({email = '', password = ''}) {
        this.validationService.validateLoginBody({email, password})
        const user = await this.usersRepository.findByEmail(email.toLowerCase())
        if (!user)
            throw new BadRequest({email: errorMessages.userNotExists})
        await this.validationService.comparePassword(password, user.password)
        return this.jwtService.generateAuthTokens({id: user.user_id, email: user.email})
    }

    encryptPassword(password) {
        return bcrypt.hash(password, 10)
    }

    setRefreshTokenCookie(setCookieCb, refreshToken) {
        return setCookieCb.cookie('refreshToken', refreshToken, {
            maxAge: authentication.jwt.cookieExpiresDate,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development'
        })
    }

    async register({email = '', password = '', name = ''}) {
        let userExists = await this.usersRepository.findByEmail(email)
        if (userExists) return this.jwtService
            .generateAuthTokens({id: userExists.user_id, email: userExists.email, name: userExists.name})

        const user = await this.usersRepository.createUser({
            email: email.toLowerCase(),
            password,
            name
        })

        this.notificationsService.userRegistered({
            email: email.toLowerCase(),
            username: 'username',
            name
        })
            .catch(err => console.error(errorMessages.notificationFailed, err))

        await this.rbacService.addUserRoles(user.user_id, [roles.endUser])
        return this.jwtService
            .generateAuthTokens({id: user.user_id, email: user.email, name: user.name})
    }

    async registerRequest({email, name, password}, appUrl) {
        this.validationService.validateRegisterBody({email, name, password})
        let userExists = await this.usersRepository.findByEmail(email)

        if (userExists)
            throw new BadRequest({email: errorMessages.userAlreadyExists})

        const hash = await bcrypt.hash(password, 12)

        const token = this.jwtService.signToken({email, name, password: hash})
        const confirmationLink = appUrl + "/register/" + token
        const template = loadTemplate(path.join(global.appRoot, 'src/templates/confirmationEmail.html'))
        const templateHTML = parseTemplate(template, {name, confirmationLink})

        try {
            await this.emailService.sendRegisterConfirmationLink({
                recepient: email,
                confirmationLink,
                body: templateHTML
            })
        } catch (err) {
            throw new BadRequest(err, commonErrors.emailError)
        }
    }

    generateAuthTokens(user) {
        return this.jwtService.generateAuthTokens(user)
    }

    generateAccessToken(user) {
        return this.signToken(user)
      }

      signToken(
        payload = {},
        options = { expiresIn: authentication.jwt.accessTokenExpiresIn }
      ) {
        return jwt.sign(payload, authentication.jwt.secretOrKey, options)
      }
}

module.exports = AuthService
