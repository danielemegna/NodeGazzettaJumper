var DogList = function(list) {
	
	this.find = function() {
    for (var i = 0; i < list.length; i++) {
      dog = list[i]
      var found = dog.find()
      if(found != null)
        return found
    }

    return null
	}
}

module.exports = DogList
