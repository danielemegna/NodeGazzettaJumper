var Dog = require('./Dog')
var WebPageBuilder = require('./WebPageBuilder')

function GazzettaJumper(wgetter) {

  this.render = function() {

    var html = '<h1>NodeGazzettaJumper</h1>'

    var filescdnPageBuilder = new WebPageBuilder()
      .withEnterUrl('https://filescdn.com/f/embed/i4t6m655n555')
      .withLinksCssSelector('table tr td a')
      .withNextLinkCssSelector('.paging a:contains("Next")')
      .withSiteDomain('filescdn.com')

    html += renderPageBuilder(filescdnPageBuilder, 8)

    var avxhomePageBuilder = new WebPageBuilder()
      .withEnterUrl('http://avxhome.in/newspapers/it')
      .withLinksCssSelector('.article .title-link')
      .withNextLinkCssSelector('.pagination ul li a.next')
      .withSiteDomain('avxhome.in')

    html += renderPageBuilder(avxhomePageBuilder, 8)

    var dasoloPageBuilder = new WebPageBuilder()
      .withEnterUrl('http://dasolo.online/e-books/quotidiani/')
      .withLinksCssSelector('#maincontent h2.short a')
      .withNextLinkCssSelector('.navigation span:not(.nav_ext) + a')
      .withSiteDomain('dasolo.online')

    html += renderPageBuilder(dasoloPageBuilder, 8)

    return html
  }
  
  function renderPageBuilder(pageBuilder, pagesToBeLooked) {
    var html = "<h3>" + pageBuilder.getSiteDomain()  + "</h3>"
    
    var dog = new Dog(pageBuilder, wgetter, pagesToBeLooked)
    var foundLinks = dog.find()

    html += "<ul>"
    for (var i = 0; i < foundLinks.length; i++) {
      var link = foundLinks[i][0]
      html += '<li><a href="' + foundLinks[i].href + '">' + foundLinks[i].title + '</a></li>'
    }

    return html + "</ul>"
  }

}

module.exports = GazzettaJumper
