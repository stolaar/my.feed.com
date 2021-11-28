const {db: dbConfig} = require('../config/keys')
const Sequelize = require("sequelize");
const logger = require('../jobs/logger/logger')
const {createDb, migrate} = require("postgres-migrations")

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging:  process.env.NODE_ENV === 'development'
        ? false//(msg) => logger.debug(msg)
        : false
});

const authenticate = async () => {
    try {
        await createDb(dbConfig.database, {
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            defaultDatabase: "postgres"
        })
    } catch (err) {
        logger.error('create prob')
    }
    try {
        await migrate({
            host: dbConfig.host,
            port: dbConfig.port,
            database: dbConfig.database,
            user: dbConfig.user,
            password: dbConfig.password
        }, './src/models/migrations/')
    } catch (err) {
        logger.error(err.message)
    } finally {
        db.authenticate()
            .then(async () => {
                logger.info('Database connected!')

            })
            .catch(() => process.exit(1))
    }
}

authenticate().catch(err => logger.error(err))

module.exports = db;
