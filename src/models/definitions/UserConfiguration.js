const db = require('../db')
const Sequelize = require('sequelize')

const UserConfiguration = db.define("user_configurations", {
        user_configuration_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        feed_configuration_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

module.exports = UserConfiguration
