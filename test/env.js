/*global describe it*/

var envigor = require('../');
var assert = require('assert');

describe('env', function(){
  it('should be the env that was passed in', function() {
    var env = {};
    var cfg = envigor(env);
    assert.equal(cfg.env,env);
  });
});
