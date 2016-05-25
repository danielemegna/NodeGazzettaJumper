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

      it('works properly with single file page', function() {
        var singleFileHtml = '<div class="article">' +
          '<h1><a href="/newspapers/LaNazione23Maggio2016.html" class="title-link">La Nazione - 23 Maggio 2016</a></h1>' +
          '</div>'
        var page = new AvxhomePage(singleFileHtml)
        var link = page.linkWithTitle('La Nazione')
        expect(link).to.not.be.null
        expect(link.title).to.equal('La Nazione - 23 Maggio 2016')
        expect(link.href).to.equal('http://avxhome.in/newspapers/LaNazione23Maggio2016.html')
      })

      it('is case insensitive', function() {
        var singleFileHtml = '<div class="article">' +
          '<h1><a href="/newspapers/test.html" class="title-link">la gAZZetta dello SPort - 23 Maggio 2016</a></h1>' +
          '</div>'
        var page = new AvxhomePage(singleFileHtml)
        var link = page.linkWithTitle('Gazzetta dello sport')
        expect(link).to.not.be.null
        expect(link.title).to.equal('la gAZZetta dello SPort - 23 Maggio 2016')
        expect(link.href).to.equal('http://avxhome.in/newspapers/test.html')
      })

  })

  describe('nextPageLink method', function() {

      it('returns null with no next page link', function() {
        var page = new AvxhomePage("<html></html>")
        var href = page.nextPageLink()
        expect(href).to.be.null
      })

      it('returns full link of the next page', function() {
        var pagingHtml = '<div class="pagination">' + 
            '<ul>' +
              '<li><a href="/newspapers/it/pages/1" class="prev">Previous</a></li>' +
              '<li><a href="/newspapers/it/pages/1">1</a></li>' +
              '<li><a class="active" href="/newspapers/it/pages/2">2</a></li>' +
              '<li><a href="/newspapers/it/pages/3">3</a></li>' +
              '<li><a href="/newspapers/it/pages/3" class="next">Next</a></li>' +
            '</ul>' +
          '</div>'
        var page = new AvxhomePage(pagingHtml)
        var link = page.nextPageLink()
        expect(link.title).to.equal("Next")
        expect(link.href).to.equal("http://avxhome.in/newspapers/it/pages/3")
      })
    
  })
  
  describe('with big real page', function() {
  
    var realBigPageHtml = fs.readFileSync(__dirname + '/page1.html', 'utf8')
    var page = new AvxhomePage(realBigPageHtml)

    it('find links properly', function() {
      var link = page.linkWithTitle("Gazzetta dello Sport")
      expect(link).to.be.null

      link = page.linkWithTitle("Corriere dello Sport")
      expect(link).to.not.be.null
      expect(link.title).to.equal("Corriere dello Sport - 23 Maggio 2016")
      expect(link.href).to.equal("http://avxhome.in/newspapers/CorriereDelloSport23Maggio2016.html")
    })

    it('next page link is recognized properly', function() {
      var link = page.nextPageLink()
      expect(link.href).to.equal("http://avxhome.in/newspapers/it/pages/2")
    })

  })


})
