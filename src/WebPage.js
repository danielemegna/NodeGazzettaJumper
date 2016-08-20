var Link = require('./Link');
var cheerio = require('cheerio');

WebPage = function(html, linksCssSelector, nextLinkCssSelector, siteDomain) {

  var $cheerioHtml = cheerio.load(html)

  this.linksWithTitle = function(title) {
    return $cheerioHtml(linksCssSelector)
      .filter(titleLike(title))
      .map(buildLink)
  }

  this.nextPageLink = function() {
    var results = $cheerioHtml(nextLinkCssSelector)
    if(results.length > 0)
      return results.map(buildLink)[0]

    return null
  }

  function titleLike(title) {
    return function(index, link) {
      var currentTitleLowerCase = $cheerioHtml(link).html().toLowerCase()
      return currentTitleLowerCase.indexOf(title.toLowerCase()) > -1
    }
  }

  function buildLink(index, link) {
    var cheerioLink = $cheerioHtml(link)
    var text = cheerioLink.text().trim()
    var href = cheerioLink.attr('href')

    if(href.indexOf(siteDomain) < 0)
      href = "//" + siteDomain + href
    if(href.indexOf("http") != 0)
      href = "http:" + href

    return new Link(text, href)
  }
}

module.exports = WebPage
