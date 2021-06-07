const promise = require('bluebird')
const keys = require('../config/keys')
const {createDb, migrate} = require("postgres-migrations")
const repos = require('./repositories')
const logger = require('../jobs/logger/logger')

const initOptions = {
    promiseLib: promise,
    extend(obj, dc) {
        obj.users = new repos.Users(obj, pgp)
        obj.tokens = new repos.Tokens(obj, pgp)
        obj.userRoles = new repos.UserRoles(obj, pgp)
    }
}

const pgp = require('pg-promise')(initOptions)

const db = pgp(keys.db)

const initDb = async (db, maxTries = 10) => {
    try {
        try {
            await createDb(keys.db.database, {...keys.db, defaultDatabase: "postgres"})
        } catch (err) {
            logger.error({label: "Error creating db", err})
        }
        await migrate(keys.db, './src/models/migrations/')
    } catch (err) {
        if(maxTries < 0) {
            logger.error({label: "Migrations error", err: err.message})
            return null
        }
        return initDb(db, --maxTries)
    }
}

initDb(db)
    .then(() => {
        db.connect()
            .then(async function (obj) {
                logger.info("Postgres connected!")
                const {initAdmin} = require('./init')
                try {
                    await initAdmin(db)
                } catch (err) {
                    logger.error(err)
                } finally {
                    obj.done();
                }
            })
            .catch(function (err) {
                logger.error({label: "Postgres error", err})
                process.exit(1)
            });
    })
    .catch(err => logger.error(err))

module.exports = db
