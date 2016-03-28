var http = require('http')
var GazzettaJumper = require('./gazzettaJumper')

http.createServer(function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  var a = new GazzettaJumper();

  var link = a.getLink()
  res.write('<a href="' + link + '">' + link + '</a>');
  res.end()

}).listen(80, '0.0.0.0')

console.log('Server running..')
