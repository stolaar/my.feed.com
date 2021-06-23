const {DB_USER = '',
    DB_PASSWORD = '',
    DB_HOST = '',
    DB_PORT = 5432,
    DB_DATABASE = '',
    SECRET_OR_KEY,
    NODE_ENV,
    DB_DIALECT,
    DB_POOL_MAX,
    DB_POOL_MIN,
    DB_POOL_ACQUIRE,
    DB_POOL_IDLE
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
        dialect: DB_DIALECT || 'postgres',
        pool: {
            max: +DB_POOL_MAX,
            min: +DB_POOL_MIN,
            acquire: +DB_POOL_ACQUIRE,
            idle: +DB_POOL_IDLE
        }
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
