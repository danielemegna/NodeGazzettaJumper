var chai = require('chai'),
    expect = chai.expect,
    AvxhomePage = require('../../src/avxhome/AvxhomePage'),
    Link = require('../../src/Link'),
    fs = require('fs')

describe('AvxhomePage', function() {

  it('exists', function() {
    var page = new AvxhomePage("<html></html>")
    expect(page).to.not.be.undefined
    expect(page).to.not.be.null
    expect(page).to.be.an.instanceof(AvxhomePage)
  })
    
  describe('linkWithTitle method', function() {

      it('returns null with no link is found', function() {
        var page = new AvxhomePage("<html></html>")
        var link = page.linkWithTitle('Corriere della Sera')
        expect(link).to.be.null
      })

      xit('works properly with single file page', function() {
        var singleFileHtml = '<html><table id="xfiles"><tr class="selectable"><td>' +
          '<a href="//www.avxhome.com/5i0smm9bn6gu">La Gazzetta del Sud REGGIOCALABRIA - 01-05-2016MQ.pdf</a>' +
          '</td></tr></table></html>'
        var page = new AvxhomePage(singleFileHtml)
        var link = page.linkWithTitle('Gazzetta del Sud')
        expect(link).to.not.be.null
        expect(link.title).to.equal('La Gazzetta del Sud REGGIOCALABRIA - 01-05-2016MQ.pdf')
        expect(link.href).to.equal('http://www.avxhome.com/5i0smm9bn6gu')
      })

      xit('is case insensitive', function() {
        var singleFileHtml = '<html><table id="xfiles"><tr class="selectable"><td>' +
          '<a href="//www.avxhome.com/mplmhpajbd7c">La GAZZETTA del Sud</a>' +
          '</td></tr></table></html>'
        var page = new AvxhomePage(singleFileHtml)
        var link = page.linkWithTitle('Gazzetta del Sud')
        expect(link).to.not.be.null
        expect(link.title).to.equal('La GAZZETTA del Sud')
        expect(link.href).to.equal('http://www.avxhome.com/mplmhpajbd7c')
      })

  })

  describe('nextPageLink method', function() {

      xit('returns null with no next page link', function() {
        var page = new AvxhomePage("<html></html>")
        var href = page.nextPageLink()
        expect(href).to.be.null
      })

      xit('returns full link of the next page', function() {
        var pagingHtml = '<div class="paging">' + 
          '<b>1</b><a href="/go/embed/i4t6m655n555/2/">2</a><a href="/go/embed/i4t6m655n555/3/">3</a>' + 
          '<a href="/go/embed/i4t6m655n555/4/">4</a>' + 
          '<a href="/go/embed/i4t6m655n555/2/">Next &#187;</a><br><small>(80 total)</small>' +
          '</div>'
        var page = new AvxhomePage(pagingHtml)
        var link = page.nextPageLink()
        expect(link.title).to.equal("Next »")
        expect(link.href).to.equal("http://avxhome.com/go/embed/i4t6m655n555/2/")
      })
    
  })
  
  describe('with big real page', function() {
  
    var realBigPageHtml = fs.readFileSync(__dirname + '/test1.html', 'utf8')
    var page = new AvxhomePage(realBigPageHtml)

    xit('find links properly', function() {
      var link = page.linkWithTitle("Gazzetta dello Sport")
      expect(link).to.be.null

      link = page.linkWithTitle("Corriere dello Sport")
      expect(link).to.not.be.null
      expect(link.title).to.equal("Corriere dello Sport - 23 Maggio 2016")
    })

    xit('next page link is recognized properly', function() {
      var link = page.nextPageLink()
      expect(link.href).to.equal("http://avxhome.in/newspapers/it/pages/2")
    })

  })


})
