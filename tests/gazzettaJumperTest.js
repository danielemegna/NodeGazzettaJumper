var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

var GazzettaJumper = require('../src/gazzettaJumper');

describe('Something', function() {

  it('fake test', function() {
    var jumper = new GazzettaJumper()
    link = jumper.getLink()
    expect(link).to.equal("http://about.me/danielemegna")
  });

});
