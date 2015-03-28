var url = require('url');

function decomposeRedisUrl(obj) {
  var parts = url.parse(obj.url);
  var authPair = parts.auth.split(':');

  obj.hostname = parts.hostname;
  obj.port = parts.port;
  obj.password = authPair[1];

  //although none of the five services use it, this is redis-url's behavior
  obj.database = authPair[0];

  return obj;
}

module.exports = function cfgRedis(env, cfg) {
  if (env.REDISCLOUD_URL) {
    cfg.rediscloud = decomposeRedisUrl({url: env.REDISCLOUD_URL});
  }

  if (env.REDISTOGO_URL) {
    cfg.redistogo = decomposeRedisUrl({url: env.REDISTOGO_URL});
  }

  if (env.MYREDIS_URL) {
    cfg.myredis = decomposeRedisUrl({url: env.MYREDIS_URL});
  }

  if (env.OPENREDIS_URL) {
    cfg.openredis = decomposeRedisUrl({url: env.OPENREDIS_URL});
  }

  if (env.REDISGREEN_URL) {
    cfg.redisgreen = decomposeRedisUrl({url: env.REDISGREEN_URL});
  }

  if (env.REDIS_URL || env.REDIS_SERVICE || env.REDIS_HOSTNAME
    || env.REDIS_HOST || env.REDIS_SERVER || env.REDIS_PASSWORD
    || env.REDIS_DATABASE || env.REDIS_PORT
    || cfg.rediscloud || cfg.redistogo || cfg.myredis || cfg.openredis
    || cfg.redisgreen
    || env.DEFAULT_REDIS) {

    var service = env.REDIS_SERVICE && cfg[env.REDIS_SERVICE]
      || cfg.rediscloud || cfg.redistogo || cfg.myredis || cfg.openredis
      || cfg.redisgreen;

    cfg.redis = {
      url: env.REDIS_URL
        || service && service.url,
      service: env.REDIS_SERVICE
        || cfg.rediscloud && 'rediscloud'
        || cfg.redistogo && 'redistogo'
        || cfg.myredis && 'myredis'
        || cfg.openredis && 'openredis'
        || cfg.redisgreen && 'redisgreen'
    };

    if (cfg.redis.url) decomposeRedisUrl(cfg.redis);
    else {
      cfg.redis.port = env.REDIS_PORT || '6379';
      cfg.redis.hostname = env.REDIS_HOSTNAME || env.REDIS_HOST
        || env.REDIS_SERVER || env.REDIS_IP || 'localhost';
      cfg.redis.password = env.REDIS_PASSWORD;
      cfg.redis.database = env.REDIS_DATABASE;
      cfg.redis.url = 'redis://' + (cfg.redis.database || '')
        + (cfg.redis.password ? ':' + cfg.redis.password : '')
        + (cfg.redis.hostname || '')
        + (cfg.redis.port ? ':' + cfg.redis.port : '');
    }

    // To match https://github.com/tj/connect-redis

    cfg.redis.host = cfg.redis.hostname;
  }
};
