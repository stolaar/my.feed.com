const db = require('../db')
const Sequelize = require('sequelize')

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
        updatedAt: 'updated_at',
        defaultScope: {
            attributes: {
                include: ['name', 'email', 'user_id'],
                exclude: ['password', 'created_at', 'updated_at']
            }
        }
    });

module.exports = User
