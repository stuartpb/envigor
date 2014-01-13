module.exports = function cfgMysql(env, cfg) {
  if (env.CLEARDB_DATABASE_URL) {
    cfg.cleardb = {url: env.CLEARDB_DATABASE_URL};
  }

  if (env.MYSQL_URL || env.CLEARDB_DATABASE_URL) {
    cfg.mysql = {
      url: env.MYSQL_URL || env.CLEARDB_DATABASE_URL,
      service: env.MYSQL_SERVICE || (cfg.cleardb && 'cleardb')
    };
  }
};
