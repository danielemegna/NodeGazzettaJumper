var chai = require('chai'),
    expect = chai.expect,
    UserCloudPage = require('../../src/usercloud/UserCloudPage'),
    UserCloudFile = require('../../src/usercloud/UserCloudFile'),
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
    expect(page.files).to.be.a('function')
    expect(page.fileLinkToUserCloudFile).to.be.undefined
  })

  describe('files method', function() {

    it('return empty array with no links', function() {
      var page = new UserCloudPage("<html></html>")
      var files = page.files()
      expect(files).to.be.a('array')
      expect(files.length).to.equal(0)
    })
  
    describe('with one file available', function() {

      var singleFileHtml = '<html><table id="xfiles">' +
        '<td class="strong"><a href="//www.userscloud.com/jq73u9hsnge1">Il Corriere dello Sport - 04-04-2016</a></td>' + 
        '</table></html>'
      var page = new UserCloudPage(singleFileHtml)
      var files = page.files()
      var firstFile = files[0]

      it('return single file array', function() {
        expect(files.length).to.equal(1)
        expect(firstFile).to.be.an.instanceof(UserCloudFile)
      })

      it('return filled usercloudfiles', function() {
        expect(firstFile.title).to.equal("Il Corriere dello Sport - 04-04-2016")
        expect(firstFile.href).to.equal("//www.userscloud.com/jq73u9hsnge1")
      })

    })
    
  })

  describe('nextPageLink method', function() {

      it('return link of the next page', function() {
        var pagingHtml = '<div class="paging">' +
          '<b>1</b><a href="/go/k90iwrw5ngla/2/">2</a><a href="/go/k90iwrw5ngla/3/">3</a>' +
          '<a href="/go/k90iwrw5ngla/2/">Next &#187;</a><br><small>(54 total)</small>' +
          '</div>'
        var page = new UserCloudPage(pagingHtml)
        var link = page.nextPageLink()
        expect(link).to.equal("/go/k90iwrw5ngla/2/")
      })
    
  })
  
  describe('with big real page', function() {
  
    var realBigPageHtml = fs.readFileSync(__dirname + '/test1.html', 'utf8')
    var page = new UserCloudPage(realBigPageHtml)

    it('files are recognized properly', function() {
      var files = page.files()
      expect(files.length).to.equal(25)

      var file = page.files()[0]
      expect(file.title).to.equal("Il Tirreno - 04-04-2016HQ.pdf")
      expect(file.href).to.equal("//www.userscloud.com/msvtqrxo514w")

      file = page.files()[6]
      expect(file.title).to.equal("Tuttosport - 04-04-2016HQ.pdf")
      expect(file.href).to.equal("//www.userscloud.com/szn3zn22d38e")
    })

    it('next page link is recognized properly', function() {
      var link = page.nextPageLink()
      expect(link).to.equal("/go/k90iwrw5ngla/2/")
    })

  })


})
