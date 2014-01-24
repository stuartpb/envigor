module.exports = function cfgMysql(env, cfg) {
  if (env.CLEARDB_DATABASE_URL) {
    cfg.cleardb = {url: env.CLEARDB_DATABASE_URL};
  }

  if (env.MYSQL_URL || env.MYSQL_SERVICE || cfg.cleardb) {
    var service = env.MYSQL_SERVICE && cfg[env.MYSQL_SERVICE] || cfg.cleardb;
    
    cfg.mysql = {
      url: env.MYSQL_URL || service && service.url,
      service: env.MYSQL_SERVICE
        || cfg.cleardb && 'cleardb'
    };
  }
};
