/**
 * Description:
 *   pixiv百科事典スクレイピング
 * 　整形はまだ甘い･･･。
 * 
 * Commands:
 *   dia (free word)って<誰|だれ>
 */
var client = require('cheerio-httpcli');

// 引き抜く箇所のセレクタ
const SELECTOR_SUMMARY = '#content div.summary';
const SELECTOR_DESCRIPTION = '#content #h2_0+p';

module.exports = robot => {
    robot.respond(/(.+)って(何|なに)/i, msg => {
        const query = msg.match[1];

        const requestUri = encodeURI('http://dic.pixiv.net/a/' + query);
        console.log(requestUri);

        // ピクシブ百科事典で検索する
        client.fetch(requestUri, function (err, $, res) {
            if (!err) {
                const summary = $(SELECTOR_SUMMARY).text();
                const description = $(SELECTOR_DESCRIPTION).text();
                msg.send(summary + '\n' + description + '\n\nですわ！');
            } else {
                console.log(err);
                msg.send('失敗しましたわ･･･。');
            }

        });
    });
};
