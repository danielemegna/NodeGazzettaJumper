var Dog = function(enterUrl, pageFactory, wgetter) {
	
	this.find = function() {
    var url = enterUrl

    while(true) {
      var html = wgetter.get(url)
      var page = pageFactory.build(html)
      var gazzettaLink = page.linkWithTitle('Gazzetta dello Sport')
  
      if(gazzettaLink != null) {
        console.log('Dog: Gazzetta link found!')
        return gazzettaLink
      }

      var nextPageLink = page.nextPageLink()
      if(nextPageLink == null)
        return null

      url = nextPageLink.href
    }
	}
}

module.exports = Dog
