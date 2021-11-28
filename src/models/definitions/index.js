const User = require('./User')
const Tokens = require('./Tokens')
const FeedConfiguration = require('./FeedConfiguration')
const FeedSelectors = require('./FeedSelectors')
const UserRoles = require('./UserRoles')
const UserConfiguration = require('./UserConfiguration')
const Post = require('./Post')
const Stories = require('./Stories')
const StoryPosts = require('./StoryPosts')

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
    onDelete: 'cascade'
})

FeedSelectors.hasOne(FeedConfiguration, {foreignKey: 'feed_selectors_id', onDelete: 'cascade', hooks: true})
User.hasMany(UserRoles, {foreignKey: 'user_id'})
User.belongsToMany(FeedConfiguration, {
        through: 'user_configurations',
        as: 'configurations',
        foreignKey: 'user_id'
    }
)

Post.belongsTo(FeedConfiguration, {foreignKey: 'feed_configuration_id', as: 'configuration'})
FeedConfiguration.hasMany(Post, {as: 'posts', foreignKey: 'feed_configuration_id'})
Post.belongsTo(Stories, { through: StoryPosts, as: 'posts', foreignKey: 'post_id' })


module.exports = {
    User,
    Tokens,
    FeedConfiguration,
    FeedSelectors,
    UserRoles,
    UserConfiguration,
    Post,
    Stories,
    StoryPosts
}
