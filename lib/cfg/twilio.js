module.exports = function cfgTwilio(env, cfg) {
  if (env.TWILIO_ACCOUNT_SID || env.TWILIO_AUTH_TOKEN || env.TWILIO_NUMBER) {
    cfg.twilio = {
      accountSid: env.TWILIO_ACCOUNT_SID,
      authToken: env.TWILIO_AUTH_TOKEN,
      number: env.TWILIO_NUMBER
    };
  }
};
