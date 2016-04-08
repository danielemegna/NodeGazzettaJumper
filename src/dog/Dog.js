var Dog = function(enterUrl, pageFactory, wgetter) {
	
	this.find = function() {
		var html = wgetter.get(enterUrl)
    var page = pageFactory.build(html)
    var link = page.linkWithTitle('Gazzetta dello Sport')

    return link
	}
}

module.exports = Dog
