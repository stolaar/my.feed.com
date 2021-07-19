const { Post, FeedConfiguration } = require('../definitions/index')

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
    const result = await Post.findAll(
      {
        where: {
          link: posts.map(post => post.link)
        }
      }
    )
    // TODO: update better than this!!
    const promises = result.map(post => {
        post.changed('updated_at', true)
        return post.save()
    })
    await Promise.all(promises)
    console.log('posts', posts)
    return Post.bulkCreate(posts.filter(post => !result ? true : !result?.some(existingPost => existingPost.link === post.link)))
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
