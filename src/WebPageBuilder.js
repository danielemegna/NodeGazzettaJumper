var WebPage = require('./WebPage')

var WebPageBuilder = function() {

  this.html = '<html></html>'
  this.linksCssSelector = 'table tr td a'
  this.nextLinkCssSelector = 'a.next-css-selector'
  this.siteDomain = 'www.domain.com'
  this.enterUrl = 'http://www.domain.com/qwertyqwerty'
  
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

  this.withEnterUrl = function(enterUrl) {
    this.enterUrl = enterUrl
    return this
  }

  this.getEnterUrl = function() {
    return this.enterUrl
  }

  this.getSiteDomain = function() {
    return this.siteDomain
  }

}

module.exports = WebPageBuilder
