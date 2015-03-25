/*global describe it*/

var envigor = require('../');
var assert = require('assert');

describe('database', function(){
  it('should be present', function() {
    var cfg = envigor({DATABASE_URL: 'foo'});
    assert(cfg.database);
    assert.equal(cfg.database.url,'foo');
  });
});
