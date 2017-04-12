module.exports = (robot) ->

  robot.hear /おやすみ/i, (msg) ->
    msg.send msg.random ["おやすみなさい。"]

  robot.hear /おはよう/i, (msg) ->
    msg.send msg.random ["おはようございます。"]

  robot.hear /ただいま/i, (msg) ->
    msg.send msg.random ["おかえりなさい。いまお茶を淹れますわ。"]
