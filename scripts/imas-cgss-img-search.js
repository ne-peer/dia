/**
 * Description:
 *   IMAS CG DBからカード画像を取得
 *
 * Commands:
 *   dia (free word)のカード
 *   dia (free word)のプロフィール (wip)
 */
const request = require("request");

// starlgith api
const STARLIGHT_CHAR_API = "https://starlight.kirara.ca/api/v1/list/char_t";
const STARLIGHT_CARD_API = "https://starlight.kirara.ca/api/v1/card_t";
const STARLIGHT_IMG_HOST = "https://truecolor.kirara.ca";

/**
 * 配列からランダムな要素を取得
 *
 * @param {array} list
 */
const getRandomMatchId = list => {
  return list[Math.floor(Math.random() * list.length)];
};

/**
 * API通信を行う
 *
 * @param {string} url
 */
const fetch = url => {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject("失敗しましたわ･･･。(1)\n```" + err + "```");
      }
      resolve(JSON.parse(body));
    });
  });
};

/**
 * カードIDを指定して画像URLを取得
 *
 * @param {int} id
 */
async function getImageUrl(id) {
  const url = STARLIGHT_CARD_API + `/${id}`;
  const response = await fetch(url);
  const card = await response.result[0];

  const imgUrl = await card.sprite_image_ref;
  return await imgUrl;
};

module.exports = robot => {

  /**
   * カード画像取得
   */
  robot.respond(/(.+)の(カード)/i, msg => {
    const query = msg.match[1];

    (async () => {
      const name = query;

      // キャラクターリストからクエリの情報を取得
      const list = await fetch(STARLIGHT_CHAR_API);
      const findOfList = (list, target) => {
        const idols = list["result"];
        return idols.find(idol => idol.kanji_spaced.indexOf(target) !== -1);
      };
      const idolObj = await findOfList(list, name);

      // カードIDリスト
      const cards = idolObj.cards;

      // 先頭カードはimageが存在しないため削除
      cards.shift();
      const pickedCard = getRandomMatchId(cards);

      // 画像URL
      const url = await getImageUrl(pickedCard);

      msg.send("これですわ！\n" + url);
    })();
  });

  /**
   * プロフィール取得 (wip)
   */
  robot.respond(/(.+)の(プロフィール)/i, msg => {
    const query = msg.match[1];
    msg.send("失敗しましたわ･･･。(1)\n```" + err + "```");
  });
};
