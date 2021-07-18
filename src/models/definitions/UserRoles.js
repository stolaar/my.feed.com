const db = require('../db')
const Sequelize = require('sequelize')

const UserRole = db.define("user_roles", {
    user_role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    role: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserRole
