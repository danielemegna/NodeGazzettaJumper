var UserCloudFile = require('./UserCloudFile');
var cheerio = require('cheerio');

function UserCloudPage(html) {

  this.files = function() {
    var $html = cheerio.load(html)
    var files = $html('#xfiles td.strong > a').map(function(i, e) {
      var text = $html(this).text().trim()
      var href = $html(this).attr('href')
      return new UserCloudFile(text, href)
    }).get()
    
    return files
  }
}

module.exports = UserCloudPage
