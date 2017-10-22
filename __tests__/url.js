var DTUtility = require('../dist/lib/index.js');
var url = DTUtility.url;
var expect = require('chai').expect;

describe('URL',function(){
  describe('#format()',function(){
    it('拼接URL',function(){
      var u = URL.format('https://github.com/icepy',{name:'alibaba-dingtalk'});
      expect(u).to.equal('https://github.com/icepy?name=alibaba-dingtalk');
    });
  });
  describe('#parse()',function(){
    it('获取所有的query',function(){
      var query = URL.parse('https://github.com/icepy?name=alibaba-dingtalk');
      console.log(query);
    })
    it('获取单个name的值',function(){
      var val = URL.parse('https://github.com/icepy?name=alibaba-dingtalk','name');
      expect(val).to.equal('alibaba-dingtalk');
    });
  });
});
