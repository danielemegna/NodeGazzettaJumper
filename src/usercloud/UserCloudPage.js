var Link = require('../Link');
var cheerio = require('cheerio');

function UserCloudPage(html) {

  var $cheerioHtml = cheerio.load(html)

  this.linkWithTitle = function(title) {
    var results = $cheerioHtml('#xfiles td.strong > a:contains("' + title  + '")')
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

    if(href.indexOf("userscloud.com") < 0)
      href = "//userscloud.com" + href
    if(href.indexOf("http") != 0)
      href = "http:" + href

    return new Link(text, href)
  }
}

module.exports = UserCloudPage
