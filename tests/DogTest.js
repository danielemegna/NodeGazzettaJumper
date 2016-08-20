var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    Dog = require('../src/Dog'),
    fs = require('fs')

describe('Dog', function() {

  xit('exists', function() {
    var dog = new Dog("http://enter.page.url", null, null)
    expect(dog).to.not.be.undefined
    expect(dog).to.not.be.null
    expect(dog).to.be.an.instanceof(Dog)
  })

  var wgetterMock, pageFactoryMock, pageMock, dog
  var wgetter = { get: function (url) {} },
      pageFactory = { build: function (html) {} },
      page = { linkWithTitle: function (title) {} }
  var enterUrl = 'http://enter.page.url'

  beforeEach(function() {
    wgetterMock = sinon.mock(wgetter)
    pageFactoryMock = sinon.mock(pageFactory)
    pageMock = sinon.mock(page)
    
    dog = new Dog(enterUrl, pageFactory, wgetter)
  })

  afterEach(function() {
		wgetterMock.verify()
		pageFactoryMock.verify()
		pageMock.verify()
  })

  xit('find link when present in enterUrl page', function() {
    var enterUrlPageHtml = 'enterUrl page html'
    var expectedFoundLink = { title: 'Found title', href: '//found.href' }

    wgetterMock.expects('get').once().withExactArgs(enterUrl).returns(enterUrlPageHtml)
    pageFactoryMock.expects('build').once().withExactArgs(enterUrlPageHtml).returns(page)
    pageMock.expects('linkWithTitle').once().withExactArgs('Gazzetta dello Sport').returns(expectedFoundLink)

    var foundLink = dog.find()

    expect(foundLink).to.equals(expectedFoundLink)
  })

})
