module.exports = function cfgRethinkdb(env, cfg) {
  function firstOf(name) {
    return env['RETHINKDB_' + name]
      || env['RDB_' + name];
  }

  var hostname = firstOf('HOSTNAME') || firstOf('HOST')
    || firstOf('SERVER') || firstOf('IP');
  var port = firstOf('PORT');
  var auth = firstOf('AUTH') || firstOf('AUTHKEY') || firstOf('AUTH_KEY')
    || firstOf('PASSWORD') || firstOf('PASS');
  var database = firstOf('DATABASE') || firstOf('DB');
  var table = firstOf('TABLE');

  if (hostname || port || auth || database || table) {
    cfg.rethinkdb = {
      hostname: hostname, host: hostname,
      port: port,
      database: database, db: database,
      auth: auth, authKey: auth,
      table: table
    };
  }
};
