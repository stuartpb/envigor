/*global describe it*/

var envigor = require('../');
var assert = require('assert');

describe('port', function(){
  it('should be present', function() {
    var cfg = envigor({PORT: 8080});
    assert.equal(cfg.port,8080);
  });
});
