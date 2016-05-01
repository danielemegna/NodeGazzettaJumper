var RealWGetter = require('./RealWGetter')
var Dog = require('./Dog')
var UserCloudPageFactory = require('./usercloud/UserCloudPageFactory')

function GazzettaJumper() {

  var USERCLOUD_ENTER_URL = 'http://userscloud.com/go/k90iwrw5ngla/'
  var FILESCDN_ENTER_URL = 'https://filescdn.com/f/embed/i4t6m655n555'

  this.getLink = function() {
    var wgetter = new RealWGetter()

    var userCloudDog = new Dog(USERCLOUD_ENTER_URL, new UserCloudPageFactory(), wgetter)
    var filescdnDog = new Dog(FILESCDN_ENTER_URL, new FilescdnPageFactory(), wgetter)

    return filescdnDog.find()
  }
}

module.exports = GazzettaJumper
