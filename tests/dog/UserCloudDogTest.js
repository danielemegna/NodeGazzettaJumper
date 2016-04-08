var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    UserCloudPage = require('../../src/usercloud/UserCloudPage'),
    UserCloudFile = require('../../src/usercloud/UserCloudFile'),
    UserCloudDog = require('../../src/dog/UserCloudDog'),
    fs = require('fs')

describe('UserCloudDog', function() {

  it('exists', function() {
    var dog = new UserCloudDog("http://url.to.usercloud", null)
    expect(dog).to.not.be.undefined
    expect(dog).to.not.be.null
    expect(dog).to.be.an.instanceof(UserCloudDog)
  })

  it('calls correctly wgetter', function() {
		var url = "http://url.to.usercloud"

   	var wgetter = { getPage: function () {} }
    var wgetterMock = sinon.mock(wgetter)
    wgetterMock.expects("getPage").once().withExactArgs(url)

    var dog = new UserCloudDog(url, wgetter)
		dog.find()

		wgetterMock.verify()
  })

})
