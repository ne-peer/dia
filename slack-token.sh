#!/bin/sh

cd `dirname $0`

export HUBOT_SLACK_TOKEN={SlackToken}
export PORT=80

export HUBOT_GOOGLE_CSE_ID={GoogleApiKey}
export HUBOT_GOOGLE_CSE_KEY={GoogleCustomSearchKey}

nohup ./bin/hubot --adapter slack &
