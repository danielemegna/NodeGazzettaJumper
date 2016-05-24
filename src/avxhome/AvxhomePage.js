var Link = require('../Link');
var cheerio = require('cheerio');

function AvxhomePage(html) {

  var $cheerioHtml = cheerio.load(html)

  this.linkWithTitle = function(title) {

    var results = $cheerioHtml('.article .title-link').filter(function(i, e) {
      var currentTitleLowerCase = $cheerioHtml(e).html().toLowerCase()
      return currentTitleLowerCase.indexOf(title.toLowerCase()) > -1
    })

    if(results.length > 0)
      return buildLink(results.first())

    return null
  }

  this.nextPageLink = function() {
    var results = $cheerioHtml('.pagination ul li a.next')
    if(results.length > 0)
      return buildLink(results.first())

    return null
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

module.exports = AvxhomePage
