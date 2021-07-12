module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
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
        timestamps: false // TODO: migrate the db to inlucde timestamps
    });

    return Token;
};
