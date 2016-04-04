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

      it('return single file array', function() {
        var page = new UserCloudPage(singleFileHtml)
        var files = page.files()
        expect(files.length).to.equal(1)

        var file = files[0]
        expect(file).to.be.an.instanceof(UserCloudFile)
      })

      it('return filled usercloudfiles', function() {
        var page = new UserCloudPage(singleFileHtml)
        var file = page.files()[0]
        expect(file.title).to.equal("Il Corriere dello Sport - 04-04-2016")
        expect(file.href).to.equal("//www.userscloud.com/jq73u9hsnge1")
      })

    })
    
    describe('with big real page', function() {
    
      var realBigPageHtml = fs.readFileSync(__dirname + '/test1.html', 'utf8')

      it('works properly', function() {
        var page = new UserCloudPage(realBigPageHtml)
        var files = page.files()
        expect(files.length).to.equal(25)

        var file = page.files()[0]
        expect(file.title).to.equal("Il Tirreno - 04-04-2016HQ.pdf")
        expect(file.href).to.equal("//www.userscloud.com/msvtqrxo514w")

        file = page.files()[6]
        expect(file.title).to.equal("Tuttosport - 04-04-2016HQ.pdf")
        expect(file.href).to.equal("//www.userscloud.com/szn3zn22d38e")
      })

    })
    
  })

})
