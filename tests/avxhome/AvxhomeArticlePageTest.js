var chai = require('chai'),
    expect = chai.expect,
    AvxhomeArticlePage = require('../../src/avxhome/AvxhomeArticlePage'),
    Link = require('../../src/Link'),
    fs = require('fs')

describe('AvxhomeArticlePage', function() {

  it('exists', function() {
    var page = new AvxhomeArticlePage("<html></html>")
    expect(page).to.not.be.undefined
    expect(page).to.not.be.null
    expect(page).to.be.an.instanceof(AvxhomeArticlePage)
  })

  describe('with real page', function() {

    var realPageHtml = fs.readFileSync(__dirname + '/articlepage1.html', 'utf8')
    var page = new AvxhomeArticlePage(realPageHtml)

    it('get download links', function() {
      var links = page.getDownloadLinks()
      expect(links.length).to.equal(2)

      var first = links[0]
      expect(first.title).to.equal("La Gazzetta Dello Sport con edizioni locali")
      expect(first.href).to.equal("http://nitroflare.com/view/3D019A7D560A57F")

      var second = links[1]
      expect(second.title).to.equal("La Gazzetta Dello Sport Rosa con edizioni locali")
      expect(second.href).to.equal("http://nitroflare.com/view/ECBF7864598CF3B")
    })
    
  })


})
