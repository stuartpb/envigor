module.exports = function cfgPostgresql(env, cfg) {
  if (env.POSTGRESQL_URL) {
    cfg.postgresql = {url: env.POSTGRESQL_URL};
  }
};
