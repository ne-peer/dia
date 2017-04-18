/**
 * Description:
 *   スクレイピング
 * 
 * Commands:
 *   dia (free word)の<絵|イラスト>
 */
var client = require('cheerio-httpcli');

const SELECTOR = 'title';

module.exports = robot => {
    robot.respond(/(.+)の(絵|イラスト)/i, msg => {
        const query = msg.match[1];

        // Googleで「node.js」について検索する。
        client.fetch('http://www.google.com/search', { q: query }, function (err, $, res) {
            const content = $(SELECTOR).text();
            msg.send(content);
        });
    });
};
