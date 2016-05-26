var RealWGetter = require('./RealWGetter')
var Dog = require('./Dog')
var DogList = require('./DogList')
var UserCloudPageFactory = require('./usercloud/UserCloudPageFactory')
var FilescdnPageFactory = require('./filescdn/FilescdnPageFactory')
var AvxhomePageFactory = require('./avxhome/AvxhomePageFactory')

function GazzettaJumper() {

  var USERCLOUD_ENTER_URL = 'http://userscloud.com/go/k90iwrw5ngla/'
  var FILESCDN_ENTER_URL = 'https://filescdn.com/f/embed/i4t6m655n555'
  var AVXHOME_ENTER_URL = 'http://avxhome.in/newspapers/it'

  this.getLink = function() {
    var wgetter = new RealWGetter()

    var dogList = new DogList([
      new Dog(FILESCDN_ENTER_URL, new FilescdnPageFactory(), wgetter),
      new Dog(USERCLOUD_ENTER_URL, new UserCloudPageFactory(), wgetter),
      new Dog(AVXHOME_ENTER_URL, new AvxhomePageFactory(), wgetter)
    ])

    return dogList.find()
  }
}

module.exports = GazzettaJumper
