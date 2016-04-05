var UserCloudFile = require('./UserCloudFile');
var cheerio = require('cheerio');

function UserCloudPage(html) {

  var $cheerioHtml = cheerio.load(html)

  this.files = function() {
    var fileLinks = $cheerioHtml('#xfiles td.strong > a')
    return fileLinks.map(fileLinkToUserCloudFile).get()
  }

  this.nextPageLink = function() {
    var nextLink = $cheerioHtml('.paging a:contains("Next")').first();
    return nextLink.attr('href')
  }

  var fileLinkToUserCloudFile = function(index, link) {
    var cheerioLink = $cheerioHtml(link)
    var text = cheerioLink.text().trim()
    var href = cheerioLink.attr('href')
    return new UserCloudFile(text, href)
  }
}

module.exports = UserCloudPage
