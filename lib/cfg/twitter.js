module.exports = function cfgTwitter(env, cfg) {
  if (env.TWITTER_CONSUMER_KEY || env.TWITTER_KEY
    || env.TWITTER_CONSUMER_SECRET || env.TWITTER_SECRET) {

    cfg.twitter = {
      key: env.TWITTER_CONSUMER_KEY || env.TWITTER_KEY,
      secret: env.TWITTER_CONSUMER_SECRET || env.TWITTER_SECRET
    };
    cfg.twitter.consumerKey = cfg.twitter.key;
    cfg.twitter.consumerSecret = cfg.twitter.secret;
  }
};
