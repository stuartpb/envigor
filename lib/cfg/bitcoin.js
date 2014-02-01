function cfgCoin(coin, env, cfg) {
  function firstOf(name) {
    var coinCaps = coin.toUpperCase();
    return env[coinCaps + '_' + name]
      || env[coinCaps + 'D_' + name]
      || env[coinCaps + '_RPC' + name]
      || env[coinCaps + 'D_RPC' + name]
      || env[coinCaps + '_RPC_' + name]
      || env[coinCaps + 'D_RPC_' + name];
  }

  var hostname = firstOf('HOSTNAME') || firstOf('HOST')
    || firstOf('SERVER') || firstOf('IP');
  var port = firstOf('PORT');
  var username = firstOf('USER') || firstOf('USERNAME');
  var password = firstOf('PASSWORD') || firstOf('PASS');

  if (hostname || port || username || password) {
    env[coin] = {
      hostname: hostname, host: hostname,
      port: port,
      username: username, user: username,
      password: password, pass: password
    };
  }
}

module.exports = function cfgBitcoin(env, cfg) {
  cfgCoin('bitcoin', env, cfg);
  cfgCoin('litecoin', env, cfg);
  cfgCoin('dogecoin', env, cfg);
};
