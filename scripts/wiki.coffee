# Description:
#   与えられた文字列で wikipedia を検索して要約文を返します。
#
# Commands:
#   hubot wiki <query> - returns searched url.
#   hubot <query>を[教えて|おしえて] - returns searched url.
#

WIKIMEDIAAPI_URL = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="
WIKIPEDIA_URL = "https://ja.wikipedia.org/wiki/"

module.exports = (robot) ->
  robot.respond /(.+)を[教えて|おしえて]|wiki (.+)/, (msg) ->
    target = msg.match[1] || msg.match[2]
    url = WIKIMEDIAAPI_URL + target
    robot.http(url)
      .get() (err, res, body) ->
        resJson = JSON.parse body
        if resJson.query and resJson.query.pages
          for key, value of resJson.query.pages
            if value.title and value.extract
              msg.send "わかりましたわ！\n```\n#{value.extract}\n```\n#{WIKIPEDIA_URL}#{target}"
              return
        msg.send "#{target}･･･よくわかりませんわ。"
