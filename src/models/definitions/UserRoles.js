module.exports = (sequelize, Sequelize, {User}) => {
    const UserRole = sequelize.define("user_roles", {
        user_id: {
            type: Sequelize.INTEGER
        },
        role: {
            type: Sequelize.TEXT
        }
    });

    UserRole.hasOne(User)
    User.Roles = User.hasMany(UserRole)

    return UserRole;
};
