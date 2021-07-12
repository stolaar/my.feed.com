module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("user_roles", {
        id: {
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
    });

    return UserRole;
};
