const db = require('../db')
const Sequelize = require('sequelize')

const StoryPosts = db.define("story_posts", {
        story_post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        story_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

module.exports = StoryPosts
