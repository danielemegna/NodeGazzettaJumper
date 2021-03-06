var Dog = require('./Dog')
var WebPageBuilder = require('./WebPageBuilder')

function GazzettaJumper(wgetter) {

  this.render = function() {
    const pages = [
      new WebPageBuilder()
        .withEnterUrl('https://filescdn.com/f/embed/i4t6m655n555')
        .withLinksCssSelector('table tr td a')
        .withNextLinkCssSelector('.paging a:contains("Next")')
        .withSiteDomain('filescdn.com'),
      new WebPageBuilder()
        .withEnterUrl('http://avxhome.in/newspapers/it')
        .withLinksCssSelector('.article .title-link')
        .withNextLinkCssSelector('.pagination ul li a.next')
        .withSiteDomain('avxhome.in'),
      new WebPageBuilder()
        .withEnterUrl('http://www.dasolo.co/e-books/quotidiani')
        .withLinksCssSelector('#dle-content h1.shd a')
        .withNextLinkCssSelector('.navigation span:not(.nav_ext) + a')
        .withSiteDomain('dasolo.co'),
      new WebPageBuilder()
        .withEnterUrl('https://nodefiles.com/users/magazine/1472/GIORNALI')
        .withLinksCssSelector('table#files_list tr td a[target=_blank]')
        .withNextLinkCssSelector('')
        .withSiteDomain('nodefiles.com'),
      new WebPageBuilder()
        .withEnterUrl('https://ingressive-gallons.000webhostapp.com/italian-magazines-and-newspaper.php')
        .withLinksCssSelector('ul div#code a')
        .withNextLinkCssSelector('')
        .withSiteDomain('italian-magazines-and-newspaper'),
      new WebPageBuilder()
        .withEnterUrl('https://ingressive-gallons.000webhostapp.com/italian-daily-newspaper2.php')
        .withLinksCssSelector('ul div#code a')
        .withNextLinkCssSelector('')
        .withSiteDomain('italian-daily-newspaper2'),
      new WebPageBuilder()
        .withEnterUrl('http://ingressive-gallons.000webhostapp.com/italian-daily-newspaper_b.php')
        .withLinksCssSelector('ul div#code a')
        .withNextLinkCssSelector('')
        .withSiteDomain('italian-daily-newspaper_b'),
    ]

    var html = '<h1>NodeGazzettaJumper</h1>'
    pages.forEach(function(pageBuilder) {
      html += renderPageBuilder(pageBuilder, 8)
    })

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
