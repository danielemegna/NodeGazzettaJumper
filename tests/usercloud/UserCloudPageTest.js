var chai = require('chai'),
    expect = chai.expect,
    UserCloudPage = require('../../src/usercloud/UserCloudPage'),
    Link = require('../../src/Link'),
    fs = require('fs')

describe('UserCloudPage', function() {

  it('exists', function() {
    var page = new UserCloudPage("<html></html>")
    expect(page).to.not.be.undefined
    expect(page).to.not.be.null
    expect(page).to.be.an.instanceof(UserCloudPage)
  })

  it('hides properly private methods', function() {
    var page = new UserCloudPage("<html></html>")
    expect(page.nextPageLink).to.be.a('function')
    expect(page.fileLinkToUserCloudFile).to.be.undefined
  })
    
  describe('linkWithTitle method', function() {

      it('returns null with no link is found', function() {
        var page = new UserCloudPage("<html></html>")
        var link = page.linkWithTitle('Corriere della Sera')
        expect(link).to.be.null
      })

      it('works properly with single file page', function() {
        var singleFileHtml = '<html><table id="xfiles"><td class="strong">' +
          '<a href="http://www.userscloud.com/jq73u9hsnge1">Il Corriere dello Sport - 04-04-2016</a>' +
          '</td></table></html>'
        var page = new UserCloudPage(singleFileHtml)
        var link = page.linkWithTitle('Corriere dello Sport')
        expect(link).to.not.be.null
        expect(link.title).to.equal('Il Corriere dello Sport - 04-04-2016')
        expect(link.href).to.equal('http://www.userscloud.com/jq73u9hsnge1')
      })

  })

  describe('nextPageLink method', function() {

      it('returns null with no next page link', function() {
        var page = new UserCloudPage("<html></html>")
        var href = page.nextPageLink()
        expect(href).to.be.null
      })

      it('returns full link of the next page', function() {
        var pagingHtml = '<div class="paging">' +
          '<b>1</b><a href="/go/k90iwrw5ngla/2/">2</a><a href="/go/k90iwrw5ngla/3/">3</a>' +
          '<a href="/go/k90iwrw5ngla/2/">Next &#187;</a><br><small>(54 total)</small>' +
          '</div>'
        var page = new UserCloudPage(pagingHtml)
        var link = page.nextPageLink()
        expect(link.title).to.equal("Next »")
        expect(link.href).to.equal("http://userscloud.com/go/k90iwrw5ngla/2/")
      })
    
  })
  
  describe('with big real page', function() {
  
    var realBigPageHtml = fs.readFileSync(__dirname + '/test1.html', 'utf8')
    var page = new UserCloudPage(realBigPageHtml)

    it('find links properly', function() {
      var link = page.linkWithTitle("Gazzetta dello Sport")
      expect(link).to.be.null

      link = page.linkWithTitle("Corriere dello Sport")
      expect(link).to.not.be.null
      expect(link.title).to.equal("Il Corriere dello Sport - 04-04-2016HQ.p…")
    })

    it('next page link is recognized properly', function() {
      var link = page.nextPageLink()
      expect(link.href).to.equal("http://userscloud.com/go/k90iwrw5ngla/2/")
    })

  })


})
