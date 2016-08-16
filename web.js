var http = require('http')
var fs = require('fs');
var GazzettaJumper = require('./src/GazzettaJumper')
var RealWGetter = require('./src/RealWGetter')

var HTML_CACHE_FILE = '/tmp/gj.html'

http.createServer(function(req, res) {
  try { 
    route(req, res)
  } catch(e) {
    res.write('>>> Ops! ' + e);
  } finally {
    res.end()
  }
}).listen(80, '0.0.0.0')

function route(req, res) {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      return;
    }

    if (req.url === '/renew') {
      var wgetter = new RealWGetter()
      var gj = new GazzettaJumper(wgetter)
      var html = gj.render()
      fs.writeFileSync(HTML_CACHE_FILE, html)
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(fs.readFileSync(HTML_CACHE_FILE).toString())
}

console.log('Server running..')
