var request = require('request-sync')

function RealWGetter() {
  this.get = function(url) {
    console.log('RealWGetter: Fetching ' + url + ' ...')
    var response = request(url)
    return response.body
  }
}

module.exports = RealWGetter
