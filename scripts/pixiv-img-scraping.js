/**
 * Description:
 *   Search images on pixiv.net
 *
 * Commands:
 *   @botname <かわいい>keyword
 */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// Serach settings
const searchUrl = 'https://www.pixiv.net/search.php?word=';
const decoUrl = 'http://embed.pixiv.net/decorate.php?illust_id=';

/**
 * クローラ
 *
 * @param {string} keyword 検索ワード
 */
const crawler = async keyword => {
    // "--no-sandbox"で実行: https://github.com/GoogleChrome/puppeteer/issues/290
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();

    // 検索実行
    await page.goto(searchUrl + keyword);
    const html = await page.$eval('html', elem => elem.innerHTML);
    await browser.close();

    return html;
};

/**
 * スクレイピング
 *
 * @param {string} html
 */
const scraper = async html => {
    const $ = cheerio.load(html);
    const json = $('#js-mount-point-search-result-list').attr('data-items');
    return JSON.parse(json).map(obj => decoUrl + obj['illustId']);
}

module.exports = robot => {
    robot.respond(/(かわいい)(.+)/i, msg => {
        (async () => {
            const query = await msg.match[2];
            await msg.send(`${query}を探していますわ...`);
            const html = await crawler(query);
            const links = await scraper(html);

            // レスポンス
            await msg.send('これですわ！\n' + msg.random(links));
        })().catch(err => {
            msg.send('```' + err + '```');
        });
    });
};
