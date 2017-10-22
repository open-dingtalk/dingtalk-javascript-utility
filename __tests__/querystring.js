var DTUtility = require('../dist/lib/index.js');
var querystring = DTUtility.querystring;
var expect = require('chai').expect;

describe('querystring',function(){
  describe('#stringify()',function(){
    it('{name:"icepy",github:"icepy"} -> name=icepy&github=icepy',function(){
      expect(querystring.stringify({
        name:"icepy",
        github:"icepy"
      })).to.equal('name=icepy&github=icepy')
    });
  });
  describe('#parse()',function(){
    it('name=icepy&github=icepy -> {name:"icepy",github:"icepy"}',function(){
      console.log(querystring.parse('name=icepy&github=icepy'));
    });
  });
});
