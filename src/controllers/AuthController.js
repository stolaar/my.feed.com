const BaseController = require("./BaseController")
const AuthService = require("../services/auth/AuthService")

class AuthController extends BaseController {
    constructor(authService = new AuthService()) {
        super()
        this.authService = authService
    }

    async login(req, res, next) {
        try {
            const { accessToken, refreshToken } = await this.authService.login(req.body.data)
            this.authService.setRefreshTokenCookie(res, refreshToken)
            return res.status(200).send({
                accessToken: `Bearer ${accessToken}`,
                refreshToken
            })
        } catch (err) {
            next(err)
        }
    }

    async register(req, res, next) {
        try {
            const {user} = req
            const {accessToken, refreshToken} = await this.authService.register(user)
            if(!accessToken) return res.status(202).send({})

            return res.status(200).send({accessToken: `Bearer ${accessToken}`, refreshToken
            })
        } catch (err) {
            next(err)
        }
    }

    async registerRequest(req, res, next) {
        try {
            await this.authService.registerRequest(req.body, req.appUrl)
            return res.status(200).send({ short_message: 'Confirmation email sent!' })
        } catch (err) {
            next(err)
        }
    }

    async thirdPartyLogin(req, res, next) {
        try {
            if (!req.user) throw new Error('User is not valid')
            const {
                accessToken,
                refreshToken
            } = await this.authService.generateAuthTokens(req.user)
            this.authService.setRefreshTokenCookie(res, refreshToken)

            return res.status(200).send({
                accessToken: `Bearer ${accessToken}`,
                refreshToken
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController
