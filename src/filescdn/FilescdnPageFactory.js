var FilescdnPage = require('./FilescdnPage')

function FilescdnPageFactory() {
 
  this.build = function(html) {
    return new FilescdnPage(html)
  }
}

module.exports = FilescdnPageFactory
