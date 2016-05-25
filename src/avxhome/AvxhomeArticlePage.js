var Link = require('../Link');
var cheerio = require('cheerio');

function AvxhomeArticlePage(html) {

  var $cheerioHtml = cheerio.load(html)

  this.getDownloadLinks = function() {
    return [0, 1]
  }

  var buildLink = function(link) {
    var cheerioLink = $cheerioHtml(link)
    var text = cheerioLink.text().trim()
    var href = cheerioLink.attr('href')

    if(href.indexOf("avxhome.in") < 0)
      href = "//avxhome.in" + href
    if(href.indexOf("http") != 0)
      href = "http:" + href

    return new Link(text, href)
  }
}

module.exports = AvxhomeArticlePage
