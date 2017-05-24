/**
 * Description:
 *   アップデート
 * 
 * Commands:
 *   '<target> update'
 */
const exec = require('child_process').exec;

module.exports = robot => {

    robot.respond(/(.+) update$/i, msg => {
        const target = msg.match[1];

        const updateRecipe = [
            'cd $(cd $(dirname $0) && pwd)/../../../' + target + '/dia',
            'git pull',
            'sh slack-token.sh'
        ];

        for (let step of updateRecipe) {
            let isFailure = false;
            exec(step, function (err, stdout, stderr) {
                if (err) {
                    msg.send('update failure!\n```' + err + '```');
                    isFailure = true;
                }
            });

            if (isFailure === true) {
                // 中断
                return;
            }
        }

        msg.send('`' + target + '` update success!');
    });

};
