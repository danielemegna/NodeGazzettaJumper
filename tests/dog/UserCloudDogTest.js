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
   	var wgetterInterface = { getPage: function () {} }
    var wgetter = sinon.mock(wgetterInterface)
		var url = "http://url.to.usercloud"

    var dog = new UserCloudDog(url, wgetter)
		dog.find()

    wgetter.expects("getPage").withExactArgs(url).once()

		wgetter.verify()
  })

})
