!/bin/sh

export HUBOT_SLACK_TOKEN={SlackToken}
export PORT=80

nohup ./bin/hubot --adapter slack &
