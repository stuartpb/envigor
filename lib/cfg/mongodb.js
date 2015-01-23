module.exports = function cfgMongodb(env, cfg) {
  if (env.MONGOLAB_URI) {
    cfg.mongolab = {url: env.MONGOLAB_URI, uri: env.MONGOLAB_URI};
  }

  if (env.MONGOHQ_URL) {
    cfg.mongohq = {url: env.MONGOHQ_URL, uri: env.MONGOHQ_URL};
    cfg.compose = cfg.compose || {};
    cfg.compose.mongodb = cfg.mongohq;
  }

  if (env.MONGODB_URL || env.MONGODB_SERVICE || cfg.mongolab || cfg.mongohq) {

    var service = env.MONGODB_SERVICE && cfg[env.MONGODB_SERVICE]
      || cfg.mongolab || cfg.mongohq;

    cfg.mongodb = {
      url: env.MONGODB_URL
        || service && service.url,
      uri: env.MONGODB_URL
        || service && service.url,
      service: env.MONGODB_SERVICE
        || cfg.mongolab && 'mongolab'
        || cfg.mongohq && 'mongohq'
    };
  }
};
