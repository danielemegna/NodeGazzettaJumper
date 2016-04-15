var RealWGetter = require('./RealWGetter')
var Dog = require('./Dog')
var UserCloudPageFactory = require('./usercloud/UserCloudPageFactory')

function GazzettaJumper() {

  var USERCLOUD_ENTER_URL = 'http://userscloud.com/go/k90iwrw5ngla/'

  this.getLink = function() {
    var wgetter = new RealWGetter()
    var pageFactory = new UserCloudPageFactory()
    var dog = new Dog(USERCLOUD_ENTER_URL, pageFactory, wgetter)
    return dog.find()
  }
}

module.exports = GazzettaJumper
