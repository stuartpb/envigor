module.exports = function cfgArangodb(env, cfg) {

  if (env.ARANGODB_URL || env.ARANGODB_SERVICE) {

    cfg.arangodb = {
      url: env.ARANGODB_URL,
      service: env.ARANGODB_SERVICE
    };
  }
};
