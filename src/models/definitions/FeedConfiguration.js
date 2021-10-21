const db = require('../db')
const Sequelize = require('sequelize')

const FeedConfiguration = db.define("feed_configuration", {
        feed_configuration_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uri: {
            type: Sequelize.TEXT
        },
        label: {
            type: Sequelize.TEXT
        },
        feed_selectors_id: {
            type: Sequelize.INTEGER
        },
        slug: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'feed_configuration'
    });

module.exports = FeedConfiguration
