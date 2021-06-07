const passportJwt = require("passport-jwt");
const db = require("../models/db");
const keys = require("../config/keys");

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.authentication.jwt.secretOrKey
}

module.exports = passport => {
    passport.use(
        new passportJwt.Strategy(jwtOptions, async (payload, done) => {
            const user = await db.users.findByIdAndEmail(parseInt(payload.id), payload.email);
            if (user) {
                return done(null, payload);
            }
            return done()
        })
    )
}
