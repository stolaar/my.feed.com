const db = require('../db')
const Sequelize = require('sequelize')

const Stories = db.define("stories", {
        story_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

module.exports = Stories
