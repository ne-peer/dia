const request = require("request");

const STARLIGHT_CHAR_API = "https://starlight.kirara.ca/api/v1/list/char_t";
const STARLIGHT_IMG_HOST = "https://truecolor.kirara.ca";

/**
 * e.g.
 *
 *   resolve([
 *     '[えんじぇるはぁと]佐藤心': '3420801',
 *     '[えんじぇるはぁと]佐藤心+': '3520802',
 *     ..
 *   ]);
 */
const fetchJson = () => {
  return new Promise((resolve, reject) => {
    request(IMAS_CG_DB_JSON, (err, response, body) => {
      if (err) {
        reject("失敗しましたわ･･･。(1)\n```" + err + "```");
      }

      const toNameInIdentifier = hash => {
        const nameInId = {};
        for (const k in hash) {
          const char = hash[k];
          nameInId[char["name"]] = char["id"];
        }
        return nameInId;
      };
      resolve(toNameInIdentifier(JSON.parse(body)));
    });
  });
};

const getRandomMatchId = list => {
  return list[Math.floor(Math.random() * list.length)];
};

const getImageUrl = id => {
  return STARLIGHT_IMG_HOST + `/spread/${id}.png`;
};

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

(async () => {
  const name = "鷺沢";

  const list = await fetch(STARLIGHT_CHAR_API);
  const findOfList = (list, target) => {
    const idols = list["result"];
    return idols.find(idol => idol.kanji_spaced.indexOf(target) !== -1);
  };
  const idolObj = await findOfList(list, name);
  console.log(idolObj);

  const cards = idolObj.cards;

  // 先頭カードはimageが存在しないため削除
  cards.shift();
  const pickedCard = getRandomMatchId(cards);
  console.log(pickedCard);

  const url = getImageUrl(pickedCard);
  console.log(url);
})();
