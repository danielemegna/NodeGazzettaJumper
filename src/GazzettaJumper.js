var Dog = require('./Dog')
var UserCloudPageFactory = require('./usercloud/UserCloudPageFactory')
var FilescdnPageFactory = require('./filescdn/FilescdnPageFactory')
var AvxhomePageFactory = require('./avxhome/AvxhomePageFactory')

function GazzettaJumper(wgetter) {

  var FILESCDN_ENTER_URL = 'https://filescdn.com/f/embed/i4t6m655n555'
  var AVXHOME_ENTER_URL = 'http://avxhome.in/newspapers/it'

  this.render = function() {

    var dogList = [
      new Dog(FILESCDN_ENTER_URL, new FilescdnPageFactory(), wgetter),
      new Dog(AVXHOME_ENTER_URL, new AvxhomePageFactory(), wgetter)
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
