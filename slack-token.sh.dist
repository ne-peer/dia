#!/bin/sh

cd `dirname $0`

export HUBOT_SLACK_TOKEN={SlackToken}
export PORT=80

export HUBOT_GOOGLE_CSE_ID={GoogleApiKey}
export HUBOT_GOOGLE_CSE_KEY={GoogleCustomSearchKey}

export HUBOT_TUMBLR_CONSUMER_KEY={TumblrConsumerKey}

nohup ./bin/hubot --adapter slack &
