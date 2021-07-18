const db = require('../db')
const Sequelize = require('sequelize')

const FeedSelectors = db.define("feed_selectors", {
        feed_selectors_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        wrapper: {
            type: Sequelize.TEXT
        },
        article: {
            type: Sequelize.TEXT
        },
        title: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.TEXT
        },
        link: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });


module.exports = FeedSelectors
