module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
        token_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.TEXT
        }
    });

    return Token;
};
