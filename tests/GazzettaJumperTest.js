var chai = require('chai'),
    expect = chai.expect,
    fs = require('fs'),
    GazzettaJumper = require('../src/GazzettaJumper')
    Link = require('../src/Link'),
    cheerio = require('cheerio')

describe('GazzettaJumper', function() {

  var wgetter, gj

  beforeEach(function() {
    wgetter = new FakeWGetter()
    gj = new GazzettaJumper(wgetter)
  })

  it('shows only titles with empty pages', function() {
    var html = gj.render()
    var page = new RenderedPage(html)

    page.hasMainTitle('NodeGazzettaJumper')
    page.hasNoLinksUnder('filescdn.com')
    page.hasNoLinksUnder('avxhome.in')
  })

  it('shows filescdn links', function() {
    wgetter.push('filescdn1.html')
    wgetter.push('filescdn2.html')

    var html = gj.render()
    var page = new RenderedPage(html)

    page.hasLinksCountUnder('filescdn.com', 2)
    page.hasNoLinksUnder('avxhome.in')
  })

  it('shows avxhome links', function() {
    wgetter.push('empty.html')
    wgetter.push('avxhome1.html')
    wgetter.push('avxhome2.html')

    var html = gj.render()
    var page = new RenderedPage(html)

    page.hasLinksCountUnder('avxhome.in', 1)
    page.hasNoLinksUnder('filescdn.com')
  })

  it('full page test', function() {
    wgetter.push('filescdn1.html')
    wgetter.push('filescdn2.html')
    wgetter.push('empty.html')

    wgetter.push('avxhome1.html')
    wgetter.push('avxhome2.html')
    wgetter.push('empty.html')

    wgetter.push('dasolo1.html')
    wgetter.push('dasolo2.html')
    wgetter.push('empty.html')

    wgetter.push('nodefiles.html')
    wgetter.push('ingressive-gallons1.html')
    wgetter.push('ingressive-gallons2.html')

    var html = gj.render()
    var page = new RenderedPage(html)

    page.hasMainTitle('NodeGazzettaJumper')
    page.hasLinksCountUnder('filescdn.com', 2)
    page.hasLinksCountUnder('avxhome.in', 1)
    page.hasLinksCountUnder('dasolo.co', 1)
    page.hasLinksCountUnder('nodefiles.com', 1)
    page.hasLinksCountUnder('ingressivegallons1', 3)
    page.hasLinksCountUnder('ingressivegallons2', 1)
  })

})

var RenderedPage = function(html) {

  var $cheerioHtml = cheerio.load(html)

  this.hasMainTitle = function(title) {
    expect(html).to.contains('<h1>' + title + '</h1>')
  }

  this.hasNoLinksUnder = function(domain) {
    this.hasLinksCountUnder(domain, 0)
  }
  
  this.hasLinksCountUnder = function(domain, count) {
    expect(linksUnder(domain)).to.have.lengthOf(count)
  }

  function linksUnder(domain) {
    return $cheerioHtml('h3:contains(' + domain + ')')
      .next('ul')
      .find('li')
  }

}

var FakeWGetter = function() {

  this.default = '<html></html>'
  this.pages = []

  this.get = function(url) {
    //console.log('FakeWGetter: Fetching ' + url + ' ...')
    if(this.pages.length == 0)
      return this.default

    return this.pages.shift()
  }

  this.push = function(filename) {
    var html = fs.readFileSync(__dirname + '/html/' + filename, 'utf8')
    this.pages.push(html)
  }

}
