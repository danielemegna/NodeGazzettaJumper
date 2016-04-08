var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    Dog = require('../../src/dog/Dog'),
    fs = require('fs')

describe('Dog', function() {

  it('exists', function() {
    var dog = new Dog("http://enter.page.url", null, null)
    expect(dog).to.not.be.undefined
    expect(dog).to.not.be.null
    expect(dog).to.be.an.instanceof(Dog)
  })

  it('calls once wgetter with the enter url when gazzetta link is present in first page', function() {
		var enterUrl = 'http://enter.page.url'
    var enterUrlPageHtml = 'enterUrl page html'
    var expectedFoundLink = { title: 'Found title', href: '//found.href' }

   	var wgetter = { get: function (url) {} }
   	var pageFactory = { build: function (html) {} }
   	var page = { linkWithTitle: function (title) {} }
    var wgetterMock = sinon.mock(wgetter)
    var factoryMock = sinon.mock(pageFactory)
    var pageMock = sinon.mock(page)

    wgetterMock.expects('get').once().withExactArgs(enterUrl).returns(enterUrlPageHtml)
    factoryMock.expects('build').once().withExactArgs(enterUrlPageHtml).returns(page)
    pageMock.expects('linkWithTitle').once().withExactArgs('Gazzetta dello Sport').returns(expectedFoundLink)

    var dog = new Dog(enterUrl, pageFactory, wgetter)
    var foundLink = dog.find()

		wgetterMock.verify()
		factoryMock.verify()
		pageMock.verify()
    expect(foundLink).to.equals(expectedFoundLink)
  })

})
