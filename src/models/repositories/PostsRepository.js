const { Post, FeedConfiguration } = require('../definitions/index')
const removePostsDuplicates = require('../../services/transform/scrapper/removePostsDuplicates')

class PostsRepository {
  constructor(model = Post) {
    this.model = model
  }

  drop() {
    return this.model.drop()
  }

  findById(id) {
    return this.model.findOne({ post_id: id })
  }

  async bulkCreate(posts) {
    posts = removePostsDuplicates(posts)
    const [, updatedPosts] = await Post.update({fetched_at: new Date()},
        {
          where: {
            link: posts.map(post => post.link)
          },
          returning: true
        })

    return Post.bulkCreate(posts.filter(post => !updatedPosts ? true : !updatedPosts?.some(existingPost => existingPost.link === post.link)))
  }

  async findFromConfigurations(configurationIds) {
    return this.model.findAll({
      where: {
        feed_configuration_id: configurationIds
      },
      include: [
        {
          model: FeedConfiguration,
          as: 'configuration'
        }
      ],
      raw: true
    })
  }
}

module.exports = PostsRepository
