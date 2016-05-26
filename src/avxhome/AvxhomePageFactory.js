var AvxhomePage = require('./AvxhomePage')

function AvxhomePageFactory() {
 
  this.build = function(html) {
    return new AvxhomePage(html)
  }
}

module.exports = AvxhomePageFactory
