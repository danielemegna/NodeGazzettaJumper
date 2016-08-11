var http = require('http')
var GazzettaJumper = require('./src/GazzettaJumper')

http.createServer(function(req, res) {

  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }

  try { 
    res.writeHead(200, { 'Content-Type': 'text/html' })
    var wgetter = new RealWGetter()
    var gj = new GazzettaJumper(wgetter);
    res.write(gj.render());
  } catch(e) {
    res.write('No link found! ' + e);
  }

  res.end()

}).listen(80, '0.0.0.0')

console.log('Server running..')
