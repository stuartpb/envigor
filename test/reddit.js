/*global describe it*/

var envigor = require('../');
var assert = require('assert');

describe('reddit', function(){
  it('should have username', function() {
    var cfg = envigor({REDDIT_USERNAME: 'foo'});
    assert(cfg.reddit);
    assert.equal(cfg.reddit.username,'foo');
  });
  it('should have password', function() {
    var cfg = envigor({REDDIT_PASSWORD: 'foo'});
    assert(cfg.reddit);
    assert.equal(cfg.reddit.password,'foo');
  });
  it('should have appId', function() {
    var cfg = envigor({REDDIT_CLIENT_ID: 'foo'});
    assert(cfg.reddit);
    assert.equal(cfg.reddit.appId,'foo');
  });
  it('should have secret', function() {
    var cfg = envigor({REDDIT_SECRET: 'foo'});
    assert(cfg.reddit);
    assert.equal(cfg.reddit.secret,'foo');
  });
});
