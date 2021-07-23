const db = require('../db')
const Sequelize = require('sequelize')

const Post = db.define("posts", {
        post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        feed_configuration_id: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        },
        fetched_at: {
            type: Sequelize.TIME
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

module.exports = Post
