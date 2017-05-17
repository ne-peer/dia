/**
 * Description:
 * 
 * Commands:
 * 
 */
const request = require('request');
const cheerio = require('cheerio-httpcli');

// 引き抜く箇所のセレクタ
const SELECTOR_IMAGE_LINK = 'meta[property="og:image"]';

// imas cg database json
const IMAS_CG_DB_JSON = 'https://raw.githubusercontent.com/isaisstillalive/imas_cg_hash/master/hash2id.json';
const IMAS_CG_DB_SITE = 'http://imas.cg.db.n-hokke.com/cards/';

module.exports = robot => {
    robot.respond(/(.+)の(カード)/i, msg => {
        const query = msg.match[1];

        // get db json
        request(IMAS_CG_DB_JSON, (err, response, body) => {
            if (err) {
                msg.send('失敗しましたわ･･･。(1)\n```' + err + '```');
                return;
            }

            const arrayDb = JSON.parse(body);

            let matchList = [];
            for (let hash in arrayDb) {
                let oneIdol = arrayDb[hash];

                // nameにqueryが含まれていたら追加
                let name = oneIdol.name;
                if (name.match(query)) {
                    matchList.push(oneIdol);
                }
            }

            // 1件も一致しなければ終了
            if (matchList.length < 1) {
                msg.send('見つかりませんわ･･･。');
                return;
            }

            // ランダムに1つ取得
            let idol = matchList[Math.floor(Math.random() * matchList.length)];

            // スクレイピング
            let message = '';
            cheerio.fetch(IMAS_CG_DB_SITE + idol.id, function (err, $, res) {
                if (!err) {
                    const imgUrl = $(SELECTOR_IMAGE_LINK).attr("content");

                    message = idol.name + '\n' + imgUrl;
                } else {
                    message = '失敗しましたわ･･･。(2)\n```' + err + '```';
                }

                msg.send(message);
                return;
            });
        });
    });

};
