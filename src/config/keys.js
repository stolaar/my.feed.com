const {DB_USER = '',
    DB_PASSWORD = '',
    DB_HOST = '',
    DB_PORT = 5432,
    DB_DATABASE = '',
    SECRET_OR_KEY,
    NODE_ENV,
} = process.env

const keys = {
    db: {
        host: DB_HOST,
        port: +DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        ssl: NODE_ENV === 'development' ? false : {
            prefer: true,
            rejectUnauthorized: false,
        },
    },
    authentication: {
        jwt: {
            secretOrKey: SECRET_OR_KEY,
            accessTokenExpiresIn: '30min',
            refreshTokenExpiresIn: '1y',
            cookieExpiresDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
            )
        }
    },
    admin: {
        initEmail: process.env.INIT_ADMIN_EMAIL,
        initPassword: process.env.INIT_ADMIN_PASSWORD
    }
}

module.exports = keys
