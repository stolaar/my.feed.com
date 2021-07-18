const User = require('./User')
const Tokens = require('./Tokens')
const FeedConfiguration = require('./FeedConfiguration')
const FeedSelectors = require('./FeedSelectors')
const UserRoles = require('./UserRoles')
const UserConfiguration = require('./UserConfiguration')

Tokens.belongsTo(User, {foreignKey: 'user_id'})
User.hasMany(Tokens, {as: 'tokens', foreignKey: 'user_id'})

FeedConfiguration.belongsToMany(User, {
    through: 'user_configurations',
    as: 'configurations',
    foreignKey: 'feed_configuration_id'
})

FeedConfiguration.hasOne(FeedSelectors, {
    as: 'selectors',
    foreignKey: 'feed_selectors_id',
})

FeedSelectors.belongsTo(FeedConfiguration, {foreignKey: 'feed_selectors_id'})
User.hasMany(UserRoles, {foreignKey: 'user_id'})
User.belongsToMany(FeedConfiguration, {
        through: 'user_configurations',
        as: 'configurations',
        foreignKey: 'user_id'
    }
)
module.exports = {
    User,
    Tokens,
    FeedConfiguration,
    FeedSelectors,
    UserRoles,
    UserConfiguration
}
