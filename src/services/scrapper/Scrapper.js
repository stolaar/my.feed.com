const puppeteer = require('puppeteer')

class Scrapper {
    constructor(scrapper = puppeteer) {
        this.scrapper = scrapper
    }

    async scrape(browser, {uri, selectors, label}) {
        const page = await browser.newPage()
        await page.goto(uri, {waitUntil: 'load', timeout: 0})

        await page.waitForSelector(selectors.wrapper)

        let posts = await page.$$eval(selectors.article, (cluster, selectors, uri) => {
            cluster = cluster.filter(el => el.querySelector(selectors.title)?.textContent)
                .map(el => {
                    const imageSRC = el.querySelector(selectors.image)?.src
                    const image = imageSRC ? `${uri}/${imageSRC}` : ''

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

        return {label,uri, posts: postsObject}
    }

    async scrapeMultiple(configurations) {
        const browser = await this.scrapper.launch()

        const promises = configurations.map(configuration => this.scrape(browser, configuration))

        const result = await Promise.all(promises)

        await browser.close()
        return result
    }

}

module.exports = Scrapper
