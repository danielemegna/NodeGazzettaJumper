var UserCloudDog = function(url, wgetter) {
	
	this.find = function() {
		var html = wgetter.getPage(url)
	}
}

module.exports = UserCloudDog
