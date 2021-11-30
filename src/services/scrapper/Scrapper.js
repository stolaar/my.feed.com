const BadRequest = require('../../errors/BadRequest')
const logger = require('../../jobs/logger/logger')
const cheerio = require('cheerio')
const request = require('request')
const puppeteer = require('puppeteer')
const {NODE_ENV, CHROMIUM_PATH = '/usr/bin/chromium-browser'} = process.env

class Scrapper {
  constructor() {
    this.invalidTitles = ['Just a moment...', 'Please Wait... | Cloudflare', 'Please Wait...', 'Error ']
    this.browser = null
  }

  async scrapeMultiple(configurations, skipFrontendApps = false) {
    const allPosts = []
    for (let configuration of configurations) {
      if(skipFrontendApps) continue
      const { posts } =  await (configuration.is_frontend_app
          ? this.scrapeWithPuppeteer(configuration)
          : this.scrapeWithCheerio(configuration))

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

  async scrapeWithPuppeteer({ uri, selectors, label, feed_configuration_id }) {
    if(!this.browser) {
        this.browser = await puppeteer.launch({
          executablePath: NODE_ENV === 'development' ? undefined : CHROMIUM_PATH,
          args: ['--no-sandbox'],
        })
    }
    try {
      const page = await this.browser.newPage()
      await page.goto(uri, {waitUntil: 'load', timeout: 0})

      // TODO: REMOVE THIS! this is temporary solution for instagram
      if(new RegExp('instagram.com').test(uri)) {
          logger.info('LOG IN WITH INSTAGRAM')
          await this.instagramLogin(page, uri, selectors.article)
          logger.info('PASS THE LOGIN')
      }
      await page.waitForSelector(selectors.wrapper)

      let posts = await page.$$eval(selectors.article, (cluster, selectors, uri) => {
        cluster = cluster.map(el => {
              const imageSRC = el.querySelector(selectors.image)?.src
              const image = imageSRC ? new RegExp('(http|https)').test(imageSRC) ? imageSRC : `${uri}/${imageSRC}` : ''

              return {
                title: el.querySelector(selectors.title)?.textContent,
                description: el.querySelector(selectors.description)?.textContent,
                link: el.querySelector(selectors.link)?.href,
                image
              }
            })
        return JSON.stringify(cluster, null, 2);
      }, selectors, uri);

      const postsObject = JSON.parse(posts)
      const filteredPosts = Object.keys(postsObject).filter(key => postsObject[key].link).map(key => postsObject[key])

      for (let post of filteredPosts) {
        const page = await this.browser.newPage()
        await page.goto(post.link, {waitUntil: 'load', timeout: 0})
        try {
          await page.waitForSelector(selectors.wrapper)
        } catch (_) {
          logger.error('error waiting for selector')
        }
        try {
          page.title = await page.$eval('title', element => element.content)
          page.description = await page.$eval(selectors.description, element => element.content)
          console.log('desc', page.description)
          post.image = await page.$eval('meta[property="twitter:image"]', element => element.content)
        } catch (_) {
          page.close()
        }
        await page.close()
      }

      return {label, uri, feed_configuration_id, posts: filteredPosts}
    } catch (err) {
        this.browser.close()
        logger.error(err.message)
        throw new BadRequest('No posts found!')
    }
  }

  // TODO: Remove this hardcoded crap ASAP!
  async instagramLogin(page, initialUrl, articleSelector) {
    try {
      await page.waitForSelector('main.SCxLW', { timeout: 1000 * 10 })
      try {
        logger.info('CHECK FOR LOGIN BUTTON')
        const href = await page.evaluate(async () => {
          return await new Promise((resolve, reject) => {
            const a = document.querySelector('a.hUQXy')
            return a ? resolve(a.href) : reject()
          })
        })
        await page.goto(href)
      } catch (err) {
        logger.error('Login button not found')
      }
      logger.info('WAIT FOR USERNAME SELECTOR')
      await page.waitForSelector('[name=\'username\']', { timeout: 1000 * 10 })
      await page.type("[name='username']")
      await page.keyboard.down('Tab')
      await page.keyboard.type(process.env.INSTAGRAM_PWD)
      logger.info('CLICK LOGIN')

      const value = await page.evaluate(async () => {
        return await new Promise((fulfil) => {
          const buttons = [...document.querySelectorAll('button')]
          buttons.forEach(function (btn) {
            if (btn.innerText === 'Log In') {
              btn.click()
              return fulfil(btn.innerText)
            }
          })
          return fulfil()
        })
      })
      logger.info('BUTTON CLICKED TEXT' + value)
      await page.waitForSelector(articleSelector, { timeout: 1000 * 10 })
    } catch (err) {
      try {
        await page.goto(initialUrl)
      } catch (_) {}
      logger.error(err.message)
    }
  }
}

module.exports = Scrapper
