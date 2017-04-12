/**
 * Description:
 *   今日も一日頑張るぞい！
 *   original source: `https://github.com/udzura/hubot-zoi/blob/master/src/scripts/hubot-zoi.coffee`
 *
 * Commands:
 *   hubot (free word)<zoi|ぞい|ゾイ>
 */

const request = require('request');
const uri = 'https://gist.githubusercontent.com/ne-peer/658243d8a0c606a6867e9a041e965b8f/raw/c633f7c7f543650d014d06a14faa8fc30b64811c/zois.yml';
let zois = [];

if (!uri) {
  throw new Error('Please set zoi source uri.');
}

const getZois = cb => {
  if (zois.length > 0) {
    (cb.onZoi || cb.onSuccess)(zois);
    return;
  }

  request(uri, (err, response, body) => {
    if (err) {
      return cb.onError(err);
    }

    zois = body.match(
      /image: ['"]?https?:\/\/.+\.(jpg|png|gif).*["']?/mg
    ).map(l => {
      return l.match(/(https?:\/\/.+\.(?:jpg|png|gif))/)[1];
    });
    return (cb.onZoi || cb.onSuccess)(zois);
  });
};

module.exports = robot => {
  robot.respond(/(.+)?(zoi|ぞい|ゾイ)/i, msg => {
    getZois({
      onZoi: zois => {
        msg.send(msg.random(zois));
      },
      onError: err => {
        msg.send(`失敗しましたわ･･･。`);
      }
    });
  });
};
