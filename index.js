var env = process.env;
module.exports = function (opts) {
  var cfg = {};

  cfg.port = env.PORT;

  // MongoDB
  if (env.MONGODB_URL || env.MONGOLAB_URI || env.MONGOHQ_URL) {
    cfg.mongodb = {
      url: env.MONGODB_URL || env.MONGOLAB_URI || env.MONGOHQ_URL
    };
    if (env.MONGOLAB_URI) {
      cfg.mongodb.service = cfg.mongodb.service || 'mongolab';
      cfg.mongolab = {url: env.MONGOLAB_URI, uri: env.MONGOLAB_URI};
    }
    if (env.MONGOHQ_URL) {
      cfg.mongodb.service = cfg.mongodb.service || 'mongohq';
      cfg.mongohq = {url: env.MONGOHQ_URL};
    }
  }

  // Facebook
  if (env.FACEBOOK_APP_ID || env.FACEBOOK_SECRET || env.FACEBOOK_APP_SECRET) {
    cfg.facebook = {
      appId: env.FACEBOOK_APP_ID,
      secret: env.FACEBOOK_SECRET || env.FACEBOOK_APP_SECRET
    };
  }

  // Amazon Web Services
  var aws_access_key = env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY;
  var aws_secret = env.AWS_SECRET || env.AWS_SECRET_KEY
    || env.AWS_SECRET_ACCESS_KEY;
  if (aws_access_key || aws_secret) {
    cfg.aws = {
      accessKey: aws_access_key,
      secret: aws_secret
    };
  }

  // Amazon S3
  if (env.S3_ACCESS_KEY || env.S3_KEY || env.S3_BUCKET || env.S3_BUCKET_NAME
    || env.S3_SECRET || env.S3_SECRET_KEY || env.S3_ENDPOINT
    || aws_access_key || aws_secret) {

    cfg.s3 = {
      accessKey: env.S3_ACCESS_KEY || env.S3_KEY || aws_access_key,
      secret: env.S3_SECRET || env.S3_SECRET_KEY || aws_secret,
      bucket: env.S3_BUCKET || env.S3_BUCKET_NAME,
      endpoint: env.S3_ENDPOINT || 's3.amazonaws.com'
    };
  }

  // SMTP
  if (env.SMTP_USERNAME || env.SMTP_PASSWORD || env.SMTP_HOST || env.SMTP_PORT
    || env.MANDRILL_USERNAME || env.MANDRILL_APIKEY
    || env.POSTMARK_API_KEY || env.SENDGRID_USERNAME || env.SENDGRID_PASSWORD
    || env.MAILGUN_SMTP_LOGIN || env.MAILGUN_SMTP_PASSWORD
    || env.MAILGUN_SMTP_SERVER || env.MAILGUN_SMTP_PORT) {

    var mandrill = env.MANDRILL_USERNAME || env.MANDRILL_APIKEY;
    var postmark = env.POSTMARK_API_KEY;
    var sendgrid = env.SENDGRID_USERNAME || env.SENDGRID_PASSWORD;
    var mailgun = env.MAILGUN_SMTP_LOGIN || env.MAILGUN_SMTP_PASSWORD
      || env.MAILGUN_SMTP_SERVER || env.MAILGUN_SMTP_PORT;

    cfg.smtp = {};

    cfg.smtp.username = env.SMTP_USERNAME || env.MANDRILL_USERNAME
      || env.POSTMARK_API_KEY || env.SENDGRID_USERNAME
      || env.MAILGUN_SMTP_LOGIN;
    cfg.smtp.user = env.smtp.username;
    cfg.smtp.password = env.SMTP_PASSWORD || env.MANDRILL_APIKEY
      || env.POSTMARK_API_KEY || env.SENDGRID_PASSWORD
      || env.MAILGUN_SMTP_PASSWORD;
    cfg.smtp.pass = env.smtp.password;
    cfg.smtp.service = env.SMTP_SERVICE || (mandrill && 'mandrill')
      || (postmark && 'postmark') || (sendgrid && 'sendgrid')
      || (mailgun && 'mailgun');

    if (mandrill) {
      cfg.mandrill = {
        username: env.MANDRILL_USERNAME,
        apiKey: env.MANDRILL_APIKEY
      };
    }

    if (postmark) {
      cfg.postmark = {
        apiKey: env.POSTMARK_API_KEY,
        inboundAddress: env.POSTMARK_INBOUND_ADDRESS
      };
    }

    if (sendgrid) {
      cfg.sendgrid = {
        username: env.SENDGRID_USERNAME,
        password: env.SENDGRID_PASSWORD
      };
    }

    if (mailgun) {
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
  }

  return cfg;
};
