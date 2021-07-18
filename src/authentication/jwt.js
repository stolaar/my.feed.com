const passportJwt = require("passport-jwt");
const keys = require("../config/keys");
const {UserRepository} = require('../models/repositories/index')

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.authentication.jwt.secretOrKey
}

module.exports = passport => {
    passport.use(
        new passportJwt.Strategy(jwtOptions, async (payload, done) => {
            const user = await UserRepository.findByIdAndEmail(parseInt(payload.id), payload.email);
            if (user) {
                return done(null, payload);
            }
            return done()
        })
    )
}
