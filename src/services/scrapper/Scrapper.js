const puppeteer = require('puppeteer')
const BadRequest = require('../../errors/BadRequest')
const {NODE_ENV, CHROMIUM_PATH = '/usr/bin/chromium-browser'} = process.env

class Scrapper {
    constructor(scrapper = puppeteer) {
        this.scrapper = scrapper
    }

    async scrape(browser, {uri, selectors, feed_configuration_id, label}) {
        const page = await browser.newPage()
        await page.goto(uri, {waitUntil: 'load', timeout: 1000 * 20 })

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

        return {label,uri,feed_configuration_id, posts: postsObject}
    }

    async scrapeMultiple(configurations) {
        const browser = await this.scrapper.launch({
            executablePath: NODE_ENV === 'dev' ? undefined : CHROMIUM_PATH,
            args: ['--no-sandbox'], // This was important. Can't remember why
        })

        const promises = configurations.map(configuration => this.scrape(browser, configuration))

        const result = await Promise.all(promises)

        await browser.close()
        return result
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

}

module.exports = Scrapper
