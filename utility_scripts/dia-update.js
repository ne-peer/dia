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
            'cd ~/work/hubot/bot/' + target + '/dia',
            'git pull',
            'sh slack-token.sh'
        ];

        let failureReason = '';

        for (let step of updateRecipe) {
            exec(step, function (err, stdout, stderr) {
                if (err) {
                    msg.send();
                    failureReason = err;
                }
            });

            if (failureReason.length > 0) {
                break;
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
