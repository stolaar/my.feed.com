const db = require('../db')
const Sequelize = require('sequelize')
const Token = require('./Tokens')
const UserRoles = require('./UserRoles')

const User = db.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

User.Tokens = User.hasMany(Token, {as: 'tokens', foreignKey: 'user_id'})
User.UserRoles = User.hasMany(UserRoles)
UserRoles.belongsTo(User)

module.exports = User
