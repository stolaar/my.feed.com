module.exports = (sequelize, Sequelize, {Token}) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER
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

    User.tokens = User.hasMany(Token)

    return User;
};
