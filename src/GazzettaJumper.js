var Dog = require('./Dog')
var UserCloudPageFactory = require('./usercloud/UserCloudPageFactory')
var FilescdnPageFactory = require('./filescdn/FilescdnPageFactory')
var AvxhomePageFactory = require('./avxhome/AvxhomePageFactory')
var WebPageBuilder = require('./WebPageBuilder')

function GazzettaJumper(wgetter) {

  var FILESCDN_ENTER_URL = 'https://filescdn.com/f/embed/i4t6m655n555'
  var AVXHOME_ENTER_URL = 'http://avxhome.in/newspapers/it'

  this.render = function() {

    var filescdnPageBuilder = new WebPageBuilder()
      .withEnterUrl(FILESCDN_ENTER_URL)
      .withLinksCssSelector('table tr td a')
      .withNextLinkCssSelector('.paging a:contains("Next")')
      .withSiteDomain('filescdn.com')

    var avxhomePageBuilder = new WebPageBuilder()
      .withEnterUrl(AVXHOME_ENTER_URL)
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
