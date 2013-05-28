var env = process.env;
module.exports = function (opts) {
  var cfg = {};

  cfg.port = env.PORT;

  // MongoDB
  if (env.MONGOLAB_URI) {
    cfg.mongolab = {url: env.MONGOLAB_URI, uri: env.MONGOLAB_URI};
  }

  if (env.MONGOHQ_URL) {
    cfg.mongohq = {url: env.MONGOHQ_URL};
  }

  if (env.MONGODB_URL || env.MONGODB_SERVICE || cfg.mongolab || cfg.mongohq) {

    cfg.mongodb = {
      url: env.MONGODB_URL
        || (cfg.mongolab && cfg.mongolab.url)
        || (cfg.mongohq && cfg.mongohq.url),
      service: env.MONGODB_SERVICE || (cfg.mongolab && 'mongolab')
        || (cfg.mongohq && 'mongohq')
    };
  }

  // Facebook
  if (env.FACEBOOK_APP_ID || env.FACEBOOK_SECRET || env.FACEBOOK_APP_SECRET) {
    cfg.facebook = {
      appId: env.FACEBOOK_APP_ID,
      secret: env.FACEBOOK_SECRET || env.FACEBOOK_APP_SECRET
    };
    cfg.facebook.clientID = cfg.facebook.appId;
    cfg.facebook.clientSecret = cfg.facebook.secret;
  }

  // Twitter
  if (env.TWITTER_CONSUMER_KEY || env.TWITTER_KEY
    || env.TWITTER_CONSUMER_SECRET || env.TWITTER_SECRET) {

    cfg.twitter = {
      key: env.TWITTER_CONSUMER_KEY || env.TWITTER_KEY,
      secret: env.TWITTER_CONSUMER_SECRET || env.TWITTER_SECRET
    };
    cfg.twitter.consumerKey = cfg.twitter.key;
    cfg.twitter.consumerSecret = cfg.twitter.secret;
  }

  // Amazon Web Services
  if (env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY || env.AWS_SECRET
    || env.AWS_SECRET_KEY || env.AWS_SECRET_ACCESS_KEY) {

    cfg.aws = {
      accessKey: env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY,
      secret: env.AWS_SECRET || env.AWS_SECRET_KEY
        || env.AWS_SECRET_ACCESS_KEY
    };
  }

  // Amazon S3
  if (env.S3_ACCESS_KEY || env.S3_KEY || env.S3_BUCKET || env.S3_BUCKET_NAME
    || env.S3_SECRET || env.S3_SECRET_KEY || env.S3_ENDPOINT
    || cfg.aws) {

    cfg.s3 = {
      accessKey: env.S3_ACCESS_KEY || env.S3_KEY
        || (cfg.aws && cfg.aws.accessKey),
      secret: env.S3_SECRET || env.S3_SECRET_KEY
        || (cfg.aws && cfg.aws.secret),
      bucket: env.S3_BUCKET || env.S3_BUCKET_NAME,
      endpoint: env.S3_ENDPOINT || 's3.amazonaws.com'
    };
    cfg.s3.key = cfg.s3.accessKey;
  }

  // Mail services
  if (env.MANDRILL_USERNAME || env.MANDRILL_APIKEY) {
    cfg.mandrill = {
      username: env.MANDRILL_USERNAME,
      apiKey: env.MANDRILL_APIKEY
    };
  }

  if (env.POSTMARK_API_KEY || env.POSTMARK_INBOUND_ADDRESS) {
    cfg.postmark = {
      apiKey: env.POSTMARK_API_KEY,
      inboundAddress: env.POSTMARK_INBOUND_ADDRESS
    };
  }

  if (env.SENDGRID_USERNAME || env.SENDGRID_PASSWORD) {
    cfg.sendgrid = {
      username: env.SENDGRID_USERNAME,
      password: env.SENDGRID_PASSWORD
    };
  }

  if (env.MAILGUN_SMTP_LOGIN || env.MAILGUN_SMTP_PASSWORD
    || env.MAILGUN_SMTP_SERVER || env.MAILGUN_SMTP_PORT) {

    cfg.mailgun = {
      apiKey: env.MAILGUN_API_KEY,
      smtp: {
        username: env.MAILGUN_SMTP_LOGIN,
        user: env.MAILGUN_SMTP_LOGIN,
        login: env.MAILGUN_SMTP_LOGIN,
        password: env.MAILGUN_SMTP_PASSWORD,
        pass: env.MAILGUN_SMTP_PASSWORD,
        hostname: env.MAILGUN_SMTP_SERVER,
        host: env.MAILGUN_SMTP_SERVER,
        server: env.MAILGUN_SMTP_SERVER,
        port: env.MAILGUN_SMTP_PORT
      }
    };
  }

  // SMTP
  if (env.SMTP_USERNAME || env.SMTP_PASSWORD || env.SMTP_SERVER
    || env.SMTP_HOSTNAME || env.SMTP_HOST || env.SMTP_PORT || env.SMTP_SERVICE
    || cfg.mandrill || cfg.postmark || cfg.sendgrid || cfg.mailgun) {

    cfg.smtp = {
      username: env.SMTP_USERNAME
        || (cfg.mandrill && cfg.mandrill.username)
        || (cfg.postmark && cfg.postmark.apiKey)
        || (cfg.sendgrid && cfg.sendgrid.username)
        || (cfg.mailgun && cfg.mailgun.smtp.username),
      password: env.SMTP_PASSWORD
        || (cfg.mandrill && cfg.mandrill.apiKey)
        || (cfg.postmark && cfg.postmark.apiKey)
        || (cfg.sendgrid && cfg.sendgrid.password)
        || (cfg.mailgun && cfg.mailgun.smtp.password),
      hostname: env.SMTP_SERVER || env.SMTP_HOSTNAME || env.SMTP_HOST
        || (cfg.mandrill && 'smtp.mandrillapp.com')
        || (cfg.postmark && 'smtp.postmarkapp.com')
        || (cfg.sendgrid && 'smtp.sendgrid.net')
        || (cfg.mailgun && (cfg.mailgun.smtp.hostname || 'smtp.mailgun.org')),
      port: env.SMTP_PORT
        || (cfg.mandrill && '587')
        || (cfg.postmark && '2525') // assuming 25 will have problems
        || (cfg.sendgrid && '587')
        || (cfg.mailgun && (cfg.mailgun.smtp.port || '587')),
      service: env.SMTP_SERVICE
        || (cfg.mandrill && 'mandrill')
        || (cfg.postmark && 'postmark')
        || (cfg.sendgrid && 'sendgrid')
        || (cfg.mailgun && 'mailgun')
    };

    cfg.smtp.user = cfg.smtp.username;
    cfg.smtp.pass = cfg.smtp.password;
    cfg.smtp.auth = {user: cfg.smtp.username, pass: cfg.smtp.password};
    cfg.smtp.host = cfg.smtp.hostname;
    cfg.smtp.server = cfg.smtp.hostname;
  }

  return cfg;
};
