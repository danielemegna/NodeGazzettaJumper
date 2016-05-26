var Link = require('../Link');
var cheerio = require('cheerio');

function AvxhomeArticlePage(html) {

  var $cheerioHtml = cheerio.load(html)

  this.getDownloadLinks = function() {
    return $cheerioHtml('.article .text a[target=_blank]')
      .map(buildLink)
  }

  var buildLink = function(index, link) {
    var cheerioLink = $cheerioHtml(link)
    var text = cheerioLink.text().trim()
    var href = cheerioLink.attr('href')
    return new Link(text, href)
  }
}

module.exports = AvxhomeArticlePage
