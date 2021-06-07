const {authentication} = require("../../config/keys")
const db = require("../../models/db")
const jwt = require("jsonwebtoken")
const {SECRET_OR_KEY} = process.env

class JWTService {
    constructor(tokensRepository = db.tokens) {
        this.tokensRepository = tokensRepository
    }

    async generateAuthTokens(user = { id: '', email: '', name: '', username: ''}) {
        if (!user.id) throw new Error('Invalid payload')
        const accessToken = this.generateAccessToken(user)
        const refreshToken = await this.generateRefreshToken(user)
        return { accessToken, refreshToken }
    }

    generateAccessToken(user) {
        return this.signToken(user)
    }

    async generateRefreshToken(user) {
        const token = this.signToken(user, {
            expiresIn: '8h'
          })
          await this.tokensRepository.add({token, user_id: user.id})
          return `Bearer ${token}`
    }

    signToken(
        payload = {},
        options = { expiresIn: '8h' }
      ) {
        const token =  jwt.sign(payload, SECRET_OR_KEY, options)
        return token
      }
}


module.exports = JWTService
