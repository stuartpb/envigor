module.exports = function cfgAmazonaws(env, cfg) {
  if (env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY || env.AWS_SECRET
    || env.AWS_SECRET_KEY || env.AWS_SECRET_ACCESS_KEY) {

    cfg.aws = {
      accessKey: env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY,
      secret: env.AWS_SECRET || env.AWS_SECRET_KEY
        || env.AWS_SECRET_ACCESS_KEY
    };
  }

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

    // To match https://github.com/LearnBoost/knox
    cfg.s3.key = cfg.s3.accessKey;
  }
};
