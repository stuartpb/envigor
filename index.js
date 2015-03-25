module.exports = function (env) {
  env = env || process.env;
  var cfg = {};

  cfg.port = env.PORT || env.VCAP_APP_PORT;
  cfg.ip = env.IP;

  if (env.DATABASE_URL) {
    cfg.database = {url: env.DATABASE_URL};
  }

  require('./lib/cfg/cors.js')(env, cfg);
  require('./lib/cfg/email.js')(env, cfg);
  require('./lib/cfg/memcache.js')(env, cfg);
  require('./lib/cfg/mysql.js')(env, cfg);
  require('./lib/cfg/postgresql.js')(env, cfg);
  require('./lib/cfg/rabbitmq.js')(env, cfg);
  require('./lib/cfg/mongodb.js')(env, cfg);
  require('./lib/cfg/redis.js')(env, cfg);
  require('./lib/cfg/rethinkdb.js')(env, cfg);
  require('./lib/cfg/neo4j.js')(env, cfg);
  require('./lib/cfg/arangodb.js')(env, cfg);
  require('./lib/cfg/bitcoin.js')(env, cfg);
  require('./lib/cfg/facebook.js')(env, cfg);
  require('./lib/cfg/reddit.js')(env, cfg);
  require('./lib/cfg/twitter.js')(env, cfg);
  require('./lib/cfg/amazonaws.js')(env, cfg);
  require('./lib/cfg/twilio.js')(env, cfg);
  require('./lib/cfg/recaptcha.js')(env, cfg);

  return cfg;
};
