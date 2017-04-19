/**
 * Description:
 *   TumblrのPhoto投稿からランダムで返却
 *
 * Commands:
 *   (free word)の<絵|イラスト>
 */

const request = require('request');

const uri = 'https://api.tumblr.com/v2/tagged';

module.exports = robot => {
    robot.respond(/(.+)の(絵|イラスト)/i, msg => {
        const query = msg.match[1];
        const apiKey = process.env.HUBOT_TUMBRL_CONSUMER_KEY;

        request(uri + '?tag=' + query + '&api_key=' + apiKey, (err, response, body) => {
            if (err) {
                console.log(err);
                msg.send('失敗しましたわ･･･。');
            } else if (data.response.length < 1) {
                msg.send('見つかりませんでしたわ。');
            }

            // 画像コンテンツの投稿URLだけリスト化
            const data = JSON.parse(json_data);
            let photoPostList = [];
            for (let content of data.response) {
                if (content.type === "photo") {
                    photoPostList.push(content.post_url);
                }
            }

            msg.send(msg.random(photoPostList));
        });

    });
};
