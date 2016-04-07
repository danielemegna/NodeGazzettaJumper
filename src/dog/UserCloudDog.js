var UserCloudDog = function(url, wgetter) {
	
	this.find = function() {
		console.log(wgetter)
		wgetter.getPage(url)
	}
}

module.exports = UserCloudDog
