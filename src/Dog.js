var Dog = function(webPageBuilder, wgetter) {
	
	this.find = function() {
    var url = webPageBuilder.getEnterUrl()

    while(true) {
      var html = wgetter.get(url)
      var page = webPageBuilder.withHtml(html).build()
      var links = page.linksWithTitle('Gazzetta dello Sport')
  
      if(links.length > 0) {
        console.log('Dog: Gazzetta link found!')
        return links[0]
      }

      var nextPageLink = page.nextPageLink()
      if(nextPageLink == null)
        return null

      url = nextPageLink.href
    }
	}
}

module.exports = Dog
