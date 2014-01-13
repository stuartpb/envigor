module.exports = function cfgMemcache(env, cfg) {
  if (env.MEMCACHIER_SERVERS || env.MEMCACHIER_USERNAME
    || env.MEMCACHIER_PASSWORD) {
    cfg.memcachier = {
      servers: env.MEMCACHIER_SERVERS && env.MEMCACHIER_SERVERS.split(/[,;]/g),
      username: env.MEMCACHIER_USERNAME,
      password: env.MEMCACHIER_PASSWORD
    };
  }

  if (env.MEMCACHE_SERVERS || env.MEMCACHE_SERVICE
    || env.MEMCACHE_USERNAME || env.MEMCACHE_PASSWORD || cfg.memcachier
    || env.DEFAULT_MEMCACHE) {

    cfg.memcache = {
      servers: env.MEMCACHE_SERVERS && env.MEMCACHE_SERVERS.split(/[,;]/g)
        || (cfg.memcachier && cfg.memcachier.servers)
        || ['localhost:11211'],
      username: env.MEMCACHE_USERNAME
        || (cfg.memcachier && cfg.memcachier.username),
      password: env.MEMCACHE_PASSWORD
        || (cfg.memcachier && cfg.memcachier.password),
      service: env.MEMCACHE_SERVICE
        || (cfg.memcachier && 'memcachier')
    };
  }
};
