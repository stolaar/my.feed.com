const db = require('../db')
const Sequelize = require('sequelize')

const Token = db.define("tokens", {
    token_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    token: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Token
