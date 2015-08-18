module.exports = function cfgFirebase(env, cfg) {
  if (env.FIREBASE_SECRET || env.FIREBASE_API_KEY ||
    env.FIREBASE_APP_NAME || env.FIREBASE_APP ||
    env.FIREBASE_URL || env.FIREBASE_ID) {

    var appName = env.FIREBASE_APP_NAME || env.FIREBASE_APP ||
      env.FIREBASE_ID || env.FIREBASE_URL && env.FIREBASE_URL.replace(
        /^https?:\/\/([a-z0-9_-]*)\.firebaseio\.com\/$/i, '$1');

    cfg.firebase = {
      secret: env.FIREBASE_SECRET || env.FIREBASE_API_KEY,
      url: env.FIREBASE_URL ||
        appName && 'https://' + appName + '.firebaseio.com/',
      appName: appName
    };
  }
};
