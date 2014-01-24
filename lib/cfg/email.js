module.exports = function cfgEmail(env, cfg) {
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
        || cfg.mandrill && cfg.mandrill.username
        || cfg.postmark && cfg.postmark.apiKey
        || cfg.sendgrid && cfg.sendgrid.username
        || cfg.mailgun && cfg.mailgun.smtp.username,
      password: env.SMTP_PASSWORD
        || cfg.mandrill && cfg.mandrill.apiKey
        || cfg.postmark && cfg.postmark.apiKey
        || cfg.sendgrid && cfg.sendgrid.password
        || cfg.mailgun && cfg.mailgun.smtp.password,
      hostname: env.SMTP_SERVER || env.SMTP_HOSTNAME || env.SMTP_HOST
        || cfg.mandrill && 'smtp.mandrillapp.com'
        || cfg.postmark && 'smtp.postmarkapp.com'
        || cfg.sendgrid && 'smtp.sendgrid.net'
        || cfg.mailgun && (cfg.mailgun.smtp.hostname || 'smtp.mailgun.org'),
      port: env.SMTP_PORT
        || cfg.mandrill && '587'
        || cfg.postmark && '2525' // assuming 25 will have problems
        || cfg.sendgrid && '587'
        || cfg.mailgun && (cfg.mailgun.smtp.port || '587'),
      service: env.SMTP_SERVICE
        || cfg.mandrill && 'mandrill'
        || cfg.postmark && 'postmark'
        || cfg.sendgrid && 'sendgrid'
        || cfg.mailgun && 'mailgun'
    };

    cfg.smtp.user = cfg.smtp.username;
    cfg.smtp.pass = cfg.smtp.password;
    cfg.smtp.auth = {user: cfg.smtp.username, pass: cfg.smtp.password};
    cfg.smtp.host = cfg.smtp.hostname;
    cfg.smtp.server = cfg.smtp.hostname;
  }
};
