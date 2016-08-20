var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    Dog = require('../src/Dog'),
    fs = require('fs')

describe('Dog', function() {

  it('exists', function() {
    var dog = new Dog(null, null)
    expect(dog).to.not.be.undefined
    expect(dog).to.not.be.null
    expect(dog).to.be.an.instanceof(Dog)
  })

  var wgetterMock, pageBuilderMock, pageMock, dog
  var wgetter = { get: function (url) {} },
      pageBuilder = { getEnterUrl: function() {}, withHtml: function() {}, build: function () {} },
      page = { linksWithTitle: function (title) {} }

  beforeEach(function() {
    wgetterMock = sinon.mock(wgetter)
    pageBuilderMock = sinon.mock(pageBuilder)
    pageMock = sinon.mock(page)
    
    dog = new Dog(pageBuilder, wgetter)
  })

  afterEach(function() {
		wgetterMock.verify()
		pageBuilderMock.verify()
		pageMock.verify()
  })

  it('find link when present in enterUrl page', function() {
    var enterUrl = 'http://enterUrl'
    var enterUrlPageHtml = 'enterUrl page html'
    var expectedFoundLinks = [{ title: 'Found title', href: '//found.href' }]

    pageBuilderMock.expects('getEnterUrl').once().returns(enterUrl)
    wgetterMock.expects('get').once().withExactArgs(enterUrl).returns(enterUrlPageHtml)
    pageBuilderMock.expects('withHtml').once().withExactArgs(enterUrlPageHtml).returns(pageBuilder)
    pageBuilderMock.expects('build').once().returns(page)
    pageMock.expects('linksWithTitle').once().withExactArgs('Gazzetta dello Sport').returns(expectedFoundLinks)

    var foundLink = dog.find()

    expect(foundLink).to.equals(expectedFoundLinks[0])
  })

})
