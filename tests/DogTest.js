var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    fs = require('fs'),
    Dog = require('../src/Dog'),
    Link = require('../src/Link')

describe('Dog', function() {

  var wgetterMock, pageBuilderMock, pageMock
  var fn = function() {},
      wgetter = { get: fn },
      pageBuilder = { getEnterUrl: fn, withHtml: fn, build: fn },
      page = { linksWithTitle: fn, nextPageLink: fn }

  beforeEach(function() {
    wgetterMock = sinon.mock(wgetter)
    pageBuilderMock = sinon.mock(pageBuilder)
    pageMock = sinon.mock(page)
    
  })

  afterEach(function() {
		wgetterMock.verify()
		pageBuilderMock.verify()
		pageMock.verify()
  })

  it('find link when present in enterUrl page', function() {
    var dog = new Dog(pageBuilder, wgetter)
    var enterUrl = 'http://enterUrl'
    var enterUrlPageHtml = 'enterUrl page html'
    var foundLinks = [new Link('Found title', '//found.href')]

    pageBuilderMock.expects('getEnterUrl').once().returns(enterUrl)
    wgetterMock.expects('get').once().withExactArgs(enterUrl).returns(enterUrlPageHtml)
    pageBuilderMock.expects('withHtml').once().withExactArgs(enterUrlPageHtml).returns(pageBuilder)
    pageBuilderMock.expects('build').once().returns(page)
    pageMock.expects('linksWithTitle').once().withExactArgs('Gazzetta dello Sport').returns(foundLinks)

    var foundLink = dog.find()

    expect(foundLink).to.eql(foundLinks)
  })

  it('looks in multiple pages', function() {
    var dog = new Dog(pageBuilder, wgetter, 2)
    var enterUrl = 'http://enterUrl'
    var firstPageHtml = 'enterUrl page html'
    var firstPageFoundLinks = [new Link('Found title', '//found.href')]
    var secondPageUrl = 'http://secondPage'
    var secondPageHtml = 'second page html'
    var secondPageFoundLinks = [new Link('Another title', '//found.2nd.href')]

    pageBuilderMock.expects('getEnterUrl').once().returns(enterUrl)
    wgetterMock.expects('get').once().withExactArgs(enterUrl).returns(firstPageHtml)
    pageBuilderMock.expects('withHtml').once().withExactArgs(firstPageHtml).returns(pageBuilder)
    pageBuilderMock.expects('build').once().returns(page)
    pageMock.expects('linksWithTitle').once().withExactArgs('Gazzetta dello Sport').returns(firstPageFoundLinks)
    pageMock.expects('nextPageLink').once().returns({ href: secondPageUrl })

    wgetterMock.expects('get').once().withExactArgs(secondPageUrl).returns(secondPageHtml)
    pageBuilderMock.expects('withHtml').once().withExactArgs(secondPageHtml).returns(pageBuilder)
    pageBuilderMock.expects('build').once().returns(page)
    pageMock.expects('linksWithTitle').once().withExactArgs('Gazzetta dello Sport').returns(secondPageFoundLinks)

    var foundLinks = dog.find()
    expect(foundLinks.length).to.equals(2)

    var link = foundLinks[0]
    expect(link.title).to.equals('Found title')
    expect(link.href).to.equals('//found.href')
    link = foundLinks[1]
    expect(link.title).to.equals('Another title')
    expect(link.href).to.equals('//found.2nd.href')
  })

})
