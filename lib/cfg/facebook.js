module.exports = function cfgFacebook(env, cfg) {
  if (env.FACEBOOK_APP_ID || env.FACEBOOK_SECRET || env.FACEBOOK_APP_SECRET) {
    cfg.facebook = {
      appId: env.FACEBOOK_APP_ID,
      secret: env.FACEBOOK_SECRET || env.FACEBOOK_APP_SECRET
    };
    cfg.facebook.clientID = cfg.facebook.appId;
    cfg.facebook.clientSecret = cfg.facebook.secret;
  }
};
