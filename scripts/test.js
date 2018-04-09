
const request = require('request');

const IMAS_CG_DB_JSON = 'https://raw.githubusercontent.com/isaisstillalive/imas_cg_hash/master/hash2id.json';
const STARLIGHT_CARD_API = 'https://starlight.kirara.ca/api/v1/card_t';

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
                reject('失敗しましたわ･･･。(1)\n```' + err + '```');
            }

            const toNameInIdentifier = hash => {
                const nameInId = {};
                for (const k in hash) {
                    const char = hash[k];
                    nameInId[char['name']] = char['id'];
                }
                return nameInId;
            };
            resolve(toNameInIdentifier(JSON.parse(body)));
        });
    });
};

const getRandomMatchId = (master, target) => {
    const matches = [];
    for (const name in master) {
        if (name.indexOf(target) != -1) {
            matches.push(master[name]);
        }
    }
    return matches[Math.floor(Math.random() * matches.length)];
};

const fetchStarlight = id => {
    return new Promise((resolve, reject) => {
        const url = STARLIGHT_CARD_API + '/' + id;

        request(url, (err, response, body) => {
            if (err) {
                reject('失敗しましたわ･･･。(1)\n```' + err + '```');
            }
            resolve(body);
        });
    });
};

(async () => {
    const json = await fetchJson();
    const id = await getRandomMatchId(json, '鷺沢');
    console.log(id);
})();