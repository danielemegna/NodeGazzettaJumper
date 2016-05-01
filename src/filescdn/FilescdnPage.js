var Link = require('../Link');
var cheerio = require('cheerio');

function FilescdnPage(html) {

  var $cheerioHtml = cheerio.load(html)

  this.linkWithTitle = function(title) {

    var results = $cheerioHtml('#xfiles tr.selectable > td a').filter(function(i, e) {
      var currentTitleLowerCase = $cheerioHtml(e).html().toLowerCase()
      return currentTitleLowerCase.indexOf(title.toLowerCase()) > -1
    })

    if(results.length > 0)
      return buildLink(results.first())

    return null
  }

  this.nextPageLink = function() {
    var results = $cheerioHtml('.paging a:contains("Next")')
    if(results.length > 0)
      return buildLink(results.first())

    return null
  }

  var buildLink = function(link) {
    var cheerioLink = $cheerioHtml(link)
    var text = cheerioLink.text().trim()
    var href = cheerioLink.attr('href')

    if(href.indexOf("filescdn.com") < 0)
      href = "//filescdn.com" + href
    if(href.indexOf("http") != 0)
      href = "http:" + href

    return new Link(text, href)
  }
}

module.exports = FilescdnPage
