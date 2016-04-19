var request = require('sync-request')

function RealWGetter() {
  this.get = function(url) {
    console.log('RealWGetter: Fetching ' + url + ' ...')
    var response = request('GET', url)
    return response.body
  }
}

module.exports = RealWGetter
