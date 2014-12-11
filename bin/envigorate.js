#! /usr/bin/env node

var cfg = require('envigor')();

require('http')
  .createServer(require(require('path').resolve(process.argv[2] || '.'))(cfg))
  .listen(cfg.port || 3000, cfg.ip);
