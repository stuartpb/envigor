#! /usr/bin/env node

var cfg = require('envigor')();

var appctor = require(require('path').resolve(process.argv[2] || '.'));

if (appctor.length == 2) {
  appctor(cfg, function(err, app) {
    if (err) throw err;
    listen(app);
  });
} else {
  var app = new appctor(cfg);
  if (!app) {
    throw new Error('Got falsy value instead of app');
  } else if (typeof app.then == 'function') {
    app.then(listen, function(err){
      throw err;
    });
  } else {
    listen(app);
  }
}

function listen(app) {
  require('http').createServer(app).listen(cfg.port || 3000, cfg.ip);
}
