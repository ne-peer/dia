var client = require('cheerio-httpcli');

// Googleで「node.js」について検索する。
client.fetch('http://www.google.com/search', { q: 'node.js' }, function (err, $, res) {
  // レスポンスヘッダを参照
  console.log(res.headers);

  // HTMLタイトルを表示
  console.log($('title').text());

  // リンク一覧を表示
  $('a').each(function (idx) {
    console.log($(this).attr('href'));
  });
});
