var Dog = require('./Dog')
var WebPageBuilder = require('./WebPageBuilder')

function GazzettaJumper(wgetter) {

  this.render = function() {

    var filescdnPageBuilder = new WebPageBuilder()
      .withEnterUrl('https://filescdn.com/f/embed/i4t6m655n555')
      .withLinksCssSelector('table tr td a')
      .withNextLinkCssSelector('.paging a:contains("Next")')
      .withSiteDomain('filescdn.com')

    var avxhomePageBuilder = new WebPageBuilder()
      .withEnterUrl('http://avxhome.in/newspapers/it')
      .withLinksCssSelector('.article .title-link')
      .withNextLinkCssSelector('.pagination ul li a.next')
      .withSiteDomain('avxhome.in')

    var dogList = [
      new Dog(filescdnPageBuilder, wgetter),
      new Dog(avxhomePageBuilder, wgetter)
    ]

    var html = "<ul>"
    for (var i = 0; i < dogList.length; i++) {
      var link = dogList[i].find()
      if(link != null)
        html += '<li><a href="' + link.href + '">' + link.title + '</a></li>'
    }

    return html + "</ul>"
  }
}

module.exports = GazzettaJumper
