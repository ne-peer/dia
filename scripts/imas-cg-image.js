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

            // wip
        });
    });

    robot.respond(/(.+)の(test)/i, msg => {
        const query = msg.match[1];

        const json = '{"0dabb79ff64691111a0abae2ffed01ce":{"id":"1000101","hash":"0dabb79ff64691111a0abae2ffed01ce","name":"島村卯月","idol_id":1,"next_id":"1100102","next_hash":"798ed3093c682f20234934cef65c2106","id_family":["1000101","1100102"],"hash_family":["0dabb79ff64691111a0abae2ffed01ce","798ed3093c682f20234934cef65c2106"]},"798ed3093c682f20234934cef65c2106":{"id":"1100102","hash":"798ed3093c682f20234934cef65c2106","name":"島村卯月+","idol_id":1,"prev_id":"1000101","prev_hash":"0dabb79ff64691111a0abae2ffed01ce","id_family":["1000101","1100102"],"hash_family":["0dabb79ff64691111a0abae2ffed01ce","798ed3093c682f20234934cef65c2106"]},"250645af5bca76120314f21e69b0caca":{"id":"1213201","hash":"250645af5bca76120314f21e69b0caca","name":"[2ndｱﾆﾊﾞｰｻﾘｰ]島村卯月","idol_id":1,"next_id":"1313202","next_hash":"5ebb3e7bbe7fd6a46a5bfc3eab50097f","id_family":["1213201","1313202"],"hash_family":["250645af5bca76120314f21e69b0caca","5ebb3e7bbe7fd6a46a5bfc3eab50097f"],"id_sibling":["1213301","1313302","1213401","1313402"],"hash_sibling":["61bde20d527ff4744e91729ffbd67058","421e19ae69094b30d5edd8fa97e4d7bf","7d7fa151dcc1e44e6aaeadb3fd14eab7","09b1b846d0f89dc251b0bcac4e497e14"]}}';

        let arrayDb = JSON.parse(json);

        let matchIdList = [];
        for (let hash in arrayDb) {
            let oneIdol = arrayDb[hash];
            let name = oneIdol.name;

            // nameにqueryが含まれていたら追加
            if (name.match(query)) {
                matchIdList.push(oneIdol.id);
            }
        }

        if (matchIdList.length < 1) {
            msg.send('not found');
            return;
        }

        // ランダムに1つ取得
        let id = matchIdList[Math.floor(Math.random() * matchIdList.length)];

        // スクレイピング
        cheerio.fetch(IMAS_CG_DB_SITE + id, function (err, $, res) {
            if (!err) {
                const imgUrl = $(SELECTOR_IMAGE_LINK).attr("content");

                msg.send(imgUrl);
                return;
            } else {
                msg.send('失敗しましたわ･･･。(2)\n```' + err + '```');
                return;
            }
        });
    });
};
