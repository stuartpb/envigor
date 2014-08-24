module.exports = function cfgRecaptcha(env, cfg) {
  if (env.RECAPTCHA_PUBLIC_KEY || env.RECAPTCHA_PRIVATE_KEY) {
    cfg.recaptcha = {
      publicKey: env.RECAPTCHA_PUBLIC_KEY,
      privateKey: env.RECAPTCHA_PRIVATE_KEY
    };
  }
};
