const BadRequest = require('../../errors/BadRequest')
const logger = require('../../jobs/logger/logger')
const cheerio = require('cheerio')
const request = require('request')

class Scrapper {
  constructor() {
    this.invalidTitles = ['Just a moment...', 'Please Wait... | Cloudflare', 'Please Wait...']
  }

  async scrapeMultiple(configurations) {
    const allPosts = []
    for (let configuration of configurations) {
      const { posts } = await this.scrapeWithCheerio(configuration)
      posts.forEach(post => {
        post.feed_configuration_id = configuration.feed_configuration_id
      })
      allPosts.push(...posts)
    }
    return allPosts
  }

  async scrapeWithCheerio({ uri, selectors, label, feed_configuration_id }) {
    try {
      let list = []
      const result = await new Promise((resolve, reject) =>
        request(uri, function (error, response, html) {
          if (error) return reject(error)
          const $ = cheerio.load(html)
          $(selectors.article).each(function (i, element) {
            let link = $(element).find(selectors.link).attr('href')
            link = link
              ? new RegExp('(http|https)').test(link)
                ? link
                : uri + link
              : link
            const article = {
              link: link ? link.replace(/\/$/, '') : ''
            }
            list.push(article)
          })
          return resolve(list)
        })
      )
      const validPosts = []
      for (let post of result) {
        if (post.link) {
          try {
            const updatedPost = await this.fetchArticleMetadata(post.link)
            post = { ...post, ...updatedPost }
            validPosts.push(post)
          } catch (err) {
            logger.error(err.message)
          }
        }
      }
      return { label, uri, feed_configuration_id, posts: validPosts }
    } catch (err) {
      throw new BadRequest(err.message)
    }
  }

  async fetchArticleMetadata(link, numOfTries = 3) {
    if(numOfTries < 0) {
        throw new BadRequest('Cannot get post meta')
    }
    const post = await new Promise((resolve, reject) => {
      request(link, function (error, response, html) {
        if (error)
          return reject(
            new BadRequest('Error requesting page ' + link, error.message)
          )
        const $ = cheerio.load(html)
        const updatedPost = {
          image: $('meta[property="og:image"]').attr('content'),
          title:
            $('meta[property="og:title"]').attr('content') || $('title').text(),
          description: $('meta[property="og:description"]').attr('content')
        }
        if (!updatedPost.title) {
          return reject(new BadRequest('Cannot get the post name'))
        }
        return resolve(updatedPost)
      })
    })
    if (this.invalidTitles.includes(post.title)) {
        return this.fetchArticleMetadata(link, --numOfTries)
    }
    return post
  }
}

module.exports = Scrapper
