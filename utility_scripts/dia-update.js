/**
 * Description:
 *   アップデート
 * 
 * Commands:
 *   '<target> update'
 */
const exec = require('child_process').execSync;

module.exports = robot => {

    robot.respond(/(.+) update$/i, msg => {
        const target = msg.match[1];

        const updateRecipe = [
            'git pull ~/work/hubot/bot/' + target + '/dia',
            'sh ~/work/hubot/bot/' + target + '/dia/slack-token.sh'
        ];

        let failureReason = '';

        for (let step of updateRecipe) {
            exec(step, function (err, stdout, stderr) {
                if (stderr) {
                    failureReason = stderr;
                }
            });

            if (failureReason.length > 0) {
                // エラーがある場合は中断
                break;
            } else {
                msg.send('success: `' + step + '`')
            }
        }

        let message = '';
        if (failureReason.length > 0) {
            message = 'update failure!\n```' + failureReason + '```';
        } else {
            message = '`' + target + '` update success!';
        }

        msg.send(message);
    });

};
