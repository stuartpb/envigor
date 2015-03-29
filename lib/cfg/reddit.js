module.exports = function cfgReddit(env, cfg) {
  if (env.REDDIT_APP_ID || env.REDDIT_SECRET || env.REDDIT_APP_SECRET
    || env.REDDIT_CLIENT_ID || env.REDDIT_CLIENT_SECRET
    || env.REDDIT_USERNAME || env.REDDIT_PASSWORD) {

    cfg.reddit = {
      appId: env.REDDIT_APP_ID || env.REDDIT_CLIENT_ID,
      secret: env.REDDIT_SECRET || env.REDDIT_APP_SECRET ||
        env.REDDIT_CLIENT_SECRET,
      username: env.REDDIT_USERNAME,
      password: env.REDDIT_PASSWORD
    };

    // To match https://github.com/Slotos/passport-reddit
    cfg.reddit.clientID = cfg.reddit.appId;
    cfg.reddit.clientSecret = cfg.reddit.secret;

    // To match https://github.com/trevorsenior/snoocore
    cfg.reddit.consumerKey = cfg.reddit.appId;
    cfg.reddit.consumerSecret = cfg.reddit.secret;
    cfg.reddit.oauth = {
      consumerKey: cfg.reddit.appId,
      consumerSecret: cfg.reddit.secret
    };
  }
};
