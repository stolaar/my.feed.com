const puppeteer = require('puppeteer')
const BadRequest = require('../../errors/BadRequest')
const {NODE_ENV, CHROMIUM_PATH = '/usr/bin/chromium-browser'} = process.env
const logger = require('../../jobs/logger/logger')
const cheerio = require('cheerio')
const request = require('request')

class Scrapper {
    constructor(scrapper = puppeteer) {
        this.scrapper = scrapper
    }

    async scrape(browser, {uri, selectors, feed_configuration_id, label}) {
        const page = await browser.newPage()
        await page.goto(uri, {waitUntil: 'load', timeout: 0 })

        await page.waitForSelector(selectors.wrapper)

        let posts = await page.$$eval(selectors.article, (cluster, selectors, uri) => {
            cluster = cluster.filter(el => el.querySelector(selectors.title)?.textContent)
                .map(el => {
                    const imageSRC = el.querySelector(selectors.image)?.src
                    const image = imageSRC ? new RegExp('(http|https)').test(imageSRC) ? imageSRC : `${uri}/${imageSRC}` : ''

                    return {
                        title: el.querySelector(selectors.title).textContent,
                        description: el.querySelector(selectors.description)?.textContent,
                        link: el.querySelector(selectors.link)?.href,
                        image
                    }
                })
            return JSON.stringify(cluster, null, 2);
        }, selectors, uri);

        const postsObject = JSON.parse(posts)

        try {
            for (let post of postsObject) {
                const page = await browser.newPage()
                await page.goto(post.link, {waitUntil: 'load', timeout: 0 })
                await page.waitForSelector('div')

                let link = await page.$eval('meta[property="og:image"]', element => element.content);
                post.image = link

                await page.close()
            }
        } catch (err) {
            logger.error(err.message)
        }


        return {label,uri,feed_configuration_id, posts: postsObject}
    }

    async scrapeMultiple(configurations) {
        const allPosts = []
        for(let configuration of configurations) {
            const {posts} = await this.scrapeWithCheerio(configuration)
            posts.forEach(post => {
                post.feed_configuration_id = configuration.feed_configuration_id
            })
            allPosts.push(...posts)
        }
        return allPosts
    }

    async scrapeSingleConfiguration(configuration) {
        const browser = await this.scrapper.launch({
            executablePath: NODE_ENV === 'development' ? undefined : CHROMIUM_PATH,
            args: ['--no-sandbox'], // This was important. Can't remember why
        })
        try {
            const result = await this.scrape(browser, configuration)
            await browser.close()
            return result
        } catch (err) {
            throw new BadRequest(err.message)
        }

    }

    async scrapeWithCheerio({uri, selectors, label, feed_configuration_id}) {
        try {
            let list = []
            const result = await new Promise((resolve, reject) => request(uri, function (error, response, html) {
                if(error) return reject(error)
                const $ = cheerio.load(html);
                $(selectors.article).each(function(i, element){
                    let link = $(element).find(selectors.link).attr('href')
                    link = link ? new RegExp('(http|https)').test(link) ? link : uri + link : link
                    const article = {
                        link: link ? link.replace(/\/$/, "") : ''
                    }
                    list.push(article)
                });
                return resolve(list)
            }));
            const validPosts = []
            for(let post of result) {
                if(post.link) {
                    try {
                        const updatedPost = await new Promise((resolve, reject) => {
                            request(post.link, function (error, response, html) {
                                if(error) return reject(new BadRequest('Error requesting page ' + post.link, error.message))
                                const $ = cheerio.load(html);
                                const updatedPost = {
                                    image: $('meta[property="og:image"]').attr('content'),
                                    title: $('meta[property="og:title"]').attr('content') || $('title').text(),
                                    description: $('meta[property="og:description"]').attr('content'),
                                }
                                if(!updatedPost.title) {
                                    return reject(new BadRequest('Cannot get the post name'))
                                }
                                return resolve(updatedPost)
                            })

                        })
                        post = {...post,...updatedPost}
                        validPosts.push(post)
                    } catch (err) {
                        logger.error(err, post)
                    }

                }
            }
            return {label, uri,feed_configuration_id, posts: validPosts}
        } catch (err) {
            throw new BadRequest(err.message)
        }

    }

}

module.exports = Scrapper
