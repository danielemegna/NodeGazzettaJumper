var Dog = function(webPageBuilder, wgetter, pagesToBeLooked) {

	this.find = function() {
    var url = webPageBuilder.getEnterUrl()
    var result = []

    while(true) { 
      var html = wgetter.get(url)
      var page = webPageBuilder.withHtml(html).build()
      var found = page.linksWithTitle('Gazzetta dello Sport')
  
      if(found.length > 0)
        result = result.concat(found)

      if(--pagesToBeLooked == 0)
        break

      var nextPageLink = page.nextPageLink()
      if(nextPageLink == null)
        break

      url = nextPageLink.href
    }

    return result
	}
}

module.exports = Dog
