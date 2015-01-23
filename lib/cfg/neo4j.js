module.exports = function cfgNeo4j(env, cfg) {
  if (env.GRAPHENEDB_URL) {
    cfg.graphenedb = {url: env.GRAPHENEDB_URL};
  }

  if (env.GRAPHSTORY_URL) {
    cfg.graphstory = {url: env.GRAPHSTORY_URL};
  }

  if (env.NEO4J_URL || env.NEO4J_SERVICE || cfg.graphenedb || cfg.graphstory) {

    var service = env.NEO4J_SERVICE && cfg[env.NEO4J_SERVICE]
      || cfg.graphenedb || cfg.graphstory;

    cfg.neo4j = {
      url: env.NEO4J_URL
        || service && service.url,
      service: env.NEO4J_SERVICE
        || cfg.graphenedb && 'graphenedb'
        || cfg.graphstory && 'graphstory'
    };
  }
};
