const { Post, FeedConfiguration } = require('../definitions/index')
const removePostsDuplicates = require('../../services/transform/scrapper/removePostsDuplicates')
const {Op} = require('sequelize')
class PostsRepository {
  constructor(model = Post) {
    this.model = model
    this.pageSize = 10
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
      order: [['fetched_at', 'DESC']],
      where: {
        feed_configuration_id: configurationIds
      },
      include: [
        {
          model: FeedConfiguration,
          as: 'configuration',
        }
      ],
      raw: true,
      limit: 50
    })
  }

  async getCategoryPosts(category, query= {page: 1}) {
    const {count, rows} = await this.model.findAndCountAll({
      order: [['fetched_at', 'DESC']],
      include: [
        {
        model: FeedConfiguration,
        as: 'configuration',
        required: true,
        where: {
        label: category
        }
        }
      ],
      limit: this.pageSize,
      offset: (query.page * this.pageSize) - this.pageSize,
    })
    return {count: Math.ceil(count / this.pageSize), rows}
  }

  async searchPosts(query = {page: 1, search: ''}) {
    const searchFor = {
      [Op.iLike]: `%${query.search}%`
    }
    const {count, rows} = await this.model.findAndCountAll({
      where: {
        [Op.or]: [
          {title: searchFor},
          {description: searchFor},
        ]
      },
      order: [['fetched_at', 'DESC']],
      limit: this.pageSize,
      offset: (query.page * this.pageSize) - this.pageSize,
    })
    return {count: Math.ceil(count / this.pageSize), rows}
  }

}

module.exports = PostsRepository
