/**
 * Description:
 *   汎用的なメッセージ返却
 * 
 * Commands:
 *   -
 */
const request = require('request');

const COMMAND_LIST_JSON = 'https://gist.githubusercontent.com/ne-peer/b055b8efe6265fed22973976f5ed13fc/raw/50921b76e81ef6765ec718a130098d35bf8e80bf/dia_commands.json';

module.exports = robot => {
    // get json
    request(COMMAND_LIST_JSON, (err, response, body) => {
        if (err) {
            msg.send('失敗しましたわ･･･。(1)\n```' + err + '```');
            return;
        }

        const list = JSON.parse(body);

        robot.respond(/(.+)$/i, msg => {
            const query = msg.match[1];
            const commands = list.commands;

            let order = null;
            for (let k in commands) {
                let command = commands[k];
                
                if (query === command.cmd) {
                    order = command;
                    break;
                }

                // 存在しないコマンド
                return;
            }

            msg.send(order.msg);
        });
    });

};
