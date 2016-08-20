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

var WebPageBuilder = function() {

  this.html = '<html></html>'
  this.linksCssSelector = 'table tr td a'
  this.nextLinkCssSelector = 'a.next-css-selector'
  this.siteDomain = 'www.domain.com'
  
  this.build = function() {
    return new WebPage(this.html, this.linksCssSelector, this.nextLinkCssSelector, this.siteDomain)
  }

  this.withHtml = function(html) {
    this.html = html;
    return this
  }

  this.withLinksCssSelector = function(cssSelector) {
    this.linksCssSelector = cssSelector;
    return this
  }

  this.withNextLinkCssSelector = function(cssSelector) {
    this.nextLinkCssSelector = cssSelector;
    return this
  }

  this.withSiteDomain = function(siteDomain) {
    this.siteDomain = siteDomain;
    return this
  }

}

module.exports.WebPage = WebPage
module.exports.WebPageBuilder = WebPageBuilder
