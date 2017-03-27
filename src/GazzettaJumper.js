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

    var nodefilesPageBuilder = new WebPageBuilder()
      .withEnterUrl('https://nodefiles.com/users/magazine/1472/GIORNALI')
      .withLinksCssSelector('table#files_list tr td a[target=_blank]')
      .withNextLinkCssSelector('nav ul.pagination li:not(.active) a:not([aria-label=Previous])')
      .withSiteDomain('nodefiles.com')

    html += renderPageBuilder(nodefilesPageBuilder, 4)

    return html
  }
  
  function renderPageBuilder(pageBuilder, pagesToBeLooked) {
    var html = "<h3>" + pageBuilder.getSiteDomain()  + "</h3>"

    var dog = new Dog(pageBuilder, wgetter, pagesToBeLooked)
    try {
      html += renderDog(dog)
    } catch(e) {
      html += renderDogException(e)
    }

    return html
  }

  function renderDog(dog) {
      var foundLinks = dog.find()

      var html = "<ul>"
      for (var i = 0; i < foundLinks.length; i++) {
        var link = foundLinks[i]
        html += '<li><a href="' + link.href + '">' + link.title + '</a></li>'
      }
      return html + "</ul>"
  }

  function renderDogException(e) {
      return '<pre>' +
        '>>> Ops! ' + e + '\n' + e.stack +
      '</pre>'
  }

}

module.exports = GazzettaJumper
