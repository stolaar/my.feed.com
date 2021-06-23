const {db: dbConfig} = require('../config/keys')
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tokens = require("./definitions/Tokens")(sequelize, Sequelize);
db.users = require("./definitions/User")(sequelize, Sequelize, {Token: db.tokens});
db.userRoles = require("./definitions/UserRoles")(sequelize, Sequelize, {User: db.users});

module.exports = db;
