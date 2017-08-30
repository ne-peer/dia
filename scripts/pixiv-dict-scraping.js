/**
 * Description:
 *   pixiv百科事典スクレイピング
 * 
 * Commands:
 *   dia (free word)って<誰|だれ>
 */
var client = require('cheerio-httpcli');

// 引き抜く箇所のセレクタ
const SELECTOR_SUMMARY = '#content div.summary';
const SELECTOR_DESCRIPTION = '#content #h2_0+p';

module.exports = robot => {
    robot.respond(/(.+)って(誰|だれ|だあれ|何|なに)/i, msg => {
        const query = msg.match[1];

        const rawUri = 'http://dic.pixiv.net/a/' + query;
        const requestUri = encodeURI(rawUri);

        // ピクシブ百科事典で検索する
        client.fetch(requestUri, function (err, $, res) {
            if (!err) {
                const summary = $(SELECTOR_SUMMARY).text();
                const description = $(SELECTOR_DESCRIPTION).text();
                msg.send(rawUri + '\n' + summary + '\n' + description + '\n\nですわ！');
            } else {
                console.log(err);
                msg.send('失敗しましたわ･･･。');
            }
        });
    });
};
