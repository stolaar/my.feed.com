module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
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
    });

    return User;
};
