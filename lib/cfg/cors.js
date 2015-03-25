module.exports = function cfgCors(env, cfg) {
  if ( env.CORS_ALLOW_ORIGIN || env.ACCESS_CONTROL_ALLOW_ORIGIN
    || env.CORS_ALLOW_CREDENTIALS || env.ACCESS_CONTROL_ALLOW_CREDENTIALS
    || env.CORS_EXPOSE_HEADERS || env.ACCESS_CONTROL_EXPOSE_HEADERS
    || env.CORS_MAX_AGE || env.ACCESS_CONTROL_MAX_AGE
    || env.CORS_ALLOW_METHODS || env.ACCESS_CONTROL_ALLOW_METHODS
    || env.CORS_ALLOW_HEADERS || env.ACCESS_CONTROL_ALLOW_HEADERS) {

    cfg.cors = {
      allowOrigin:
        env.CORS_ALLOW_ORIGIN || env.ACCESS_CONTROL_ALLOW_ORIGIN,
      allowCredentials:
        env.CORS_ALLOW_CREDENTIALS || env.ACCESS_CONTROL_ALLOW_CREDENTIALS,
      exposeHeaders:
        env.CORS_EXPOSE_HEADERS || env.ACCESS_CONTROL_EXPOSE_HEADERS,
      maxAge:
        env.CORS_MAX_AGE || env.ACCESS_CONTROL_MAX_AGE,
      allowMethods:
        env.CORS_ALLOW_METHODS || env.ACCESS_CONTROL_ALLOW_METHODS,
      allowHeaders:
        env.CORS_ALLOW_HEADERS || env.ACCESS_CONTROL_ALLOW_HEADERS
    };
    cfg.accessControl = cfg.cors;

  }
};
