var chai = require('chai'),
    expect = chai.expect,
    fs = require('fs'),
    WebPage = require('../src/WebPage'),
    WebPageBuilder = require('../src/WebPageBuilder')

describe('WebPage', function() {
    
  describe('linksWithTitle method', function() {

      it('returns null with no link is found', function() {
        var page = new WebPageBuilder()
          .withHtml('<html></html>')
          .build()

        var links = page.linksWithTitle('Corriere della Sera')
        expect(links).to.not.be.null
        expect(links.length).to.equal(0)
      })

      it('works with single file page', function() {
        var singleFileHtml = '<html><table><tr><td>' +
          '<a href="http://www.domain.com/5i0smm9bn6gu">La Gazzetta del Sud REGGIOCALABRIA - 01-05-2016MQ.pdf</a>' +
          '</td></tr></table></html>'
        var page = new WebPageBuilder()
          .withLinksCssSelector('table tr td a')
          .withHtml(singleFileHtml)
          .build()

        var links = page.linksWithTitle('Gazzetta del Sud')
        expect(links.length).to.equal(1)

        var link = links[0]
        expect(link.title).to.equal('La Gazzetta del Sud REGGIOCALABRIA - 01-05-2016MQ.pdf')
        expect(link.href).to.equal('http://www.domain.com/5i0smm9bn6gu')
      })

      it('filters by title', function() {
        var singleFileHtml = '<html><table><tr><td>' +
          '<a href="http://www.domain.com/5i0smm9bn6gu">La Gazzetta del Sud REGGIOCALABRIA - 01-05-2016MQ</a>' +
          '<a href="http://www.domain.com/38kab72bjshd">La Gazzetta dello Sport - 20-06-2016</a>' +
          '</td></tr></table></html>'
        var page = new WebPageBuilder()
          .withHtml(singleFileHtml)
          .build()

        var links = page.linksWithTitle('Gazzetta dello Sport')
        expect(links.length).to.equal(1)

        var link = links[0]
        expect(link.title).to.equal('La Gazzetta dello Sport - 20-06-2016')
        expect(link.href).to.equal('http://www.domain.com/38kab72bjshd')
      })

      it('is case insensitive', function() {
        var singleFileHtml = '<html><table><tr><td>' +
          '<a href="http://www.domain.com/mplmhpajbd7c">La GAZZETTA del Sud</a>' +
          '</td></tr></table></html>'
        var page = new WebPageBuilder()
          .withHtml(singleFileHtml)
          .build()

        var links = page.linksWithTitle('Gazzetta del Sud')
        expect(links.length).to.equal(1)

        var link = links[0]
        expect(link.title).to.equal('La GAZZETTA del Sud')
        expect(link.href).to.equal('http://www.domain.com/mplmhpajbd7c')
      })

      it('completes href with http protocol', function() {
        var singleFileHtml = '<html><table><tr><td>' +
          '<a href="//www.domain.com/29dfb92j193c">La Gazzetta dello Sport</a>' +
          '</td></tr></table></html>'
        var page = new WebPageBuilder()
          .withHtml(singleFileHtml)
          .build()

        var links = page.linksWithTitle('Gazzetta dello Sport')
        expect(links.length).to.equal(1)

        var link = links[0]
        expect(link.title).to.equal('La Gazzetta dello Sport')
        expect(link.href).to.equal('http://www.domain.com/29dfb92j193c')
      })

  })

  describe('nextPageLink method', function() {

      it('returns null with no next page link', function() {
        var page = new WebPageBuilder()
          .withHtml('<html></html>')
          .build()

        var link = page.nextPageLink()
        expect(link).to.be.null
      })

      it('returns full link of the next page', function() {
        var pagingHtml = '<div class="paging">' + 
          '<b>1</b><a href="/go/embed/i4t6m655n555/2/">2</a><a href="/go/embed/i4t6m655n555/3/">3</a>' + 
          '<a href="/go/embed/i4t6m655n555/4/">4</a>' + 
          '<a href="/go/embed/i4t6m655n555/2/">Next &#187;</a><br><small>(80 total)</small>' +
          '</div>'
        var page = new WebPageBuilder()
          .withHtml(pagingHtml)
          .withNextLinkCssSelector('.paging a:contains("Next")')
          .build()

        var link = page.nextPageLink()
        expect(link.title).to.equal("Next »")
        expect(link.href).to.equal("http://www.domain.com/go/embed/i4t6m655n555/2/")
      })
    
  })
  
  describe('with big real page', function() {
  
    var realBigPageHtml = fs.readFileSync(__dirname + '/html/filescdn1.html', 'utf8')
    var page = new WebPageBuilder()
      .withHtml(realBigPageHtml)
      .withLinksCssSelector('table tr td a')
      .withNextLinkCssSelector('.paging a:contains("Next")')
      .withSiteDomain('filescdn.com')
      .build()

    it('find links properly', function() {
      var links = page.linksWithTitle("Gazzetta dello Sport")
      expect(links.length).to.equal(0)

      links = page.linksWithTitle("Corriere della Sera")
      expect(links.length).to.equal(1)
      expect(links[0].title).to.equal("Corriere della Sera La Lettura - 1 Maggio 2016.pdf")
      expect(links[0].href).to.equal("http://www.filescdn.com/h8j64221zbpe")

      links = page.linksWithTitle("La Gazzetta")
      expect(links.length).to.equal(4)
      expect(links[0].title).to.equal("La Gazzetta del Sud REGGIOCALABRIA - 01-05-2016MQ.pdf")
      expect(links[1].href).to.equal("http://www.filescdn.com/5monx075lq81")
      expect(links[2].title).to.equal("La Gazzetta del Sud MESSINA - 01-05-2016MQ.pdf")
      expect(links[3].href).to.equal("http://www.filescdn.com/ggho0h4q8eg4")
    })

    it('next page link is recognized properly', function() {
      var link = page.nextPageLink()
      expect(link.href).to.equal("http://filescdn.com/go/embed/i4t6m655n555/2/")
    })

  })

})

