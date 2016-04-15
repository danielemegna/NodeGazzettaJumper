var UserCloudPage = require('./UserCloudPage')

function UserCloudPageFactory() {
 
  this.build = function(html) {
    return new UserCloudPage(html)
  }
}

module.exports = UserCloudPageFactory
