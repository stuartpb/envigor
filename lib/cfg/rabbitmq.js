module.exports = function cfgRabbitmq(env, cfg) {
  if (env.RABBITMQ_BIGWIG_TX_URL || env.RABBITMQ_BIGWIG_RX_URL) {
    cfg.rabbitmqBigwig = {
      url: env.RABBITMQ_BIGWIG_TX_URL,
      tx: {url: env.RABBITMQ_BIGWIG_TX_URL},
      rx: {url: env.RABBITMQ_BIGWIG_RX_URL}
    };
  }

  if (env.CLOUDAMQP_URL) {
    cfg.cloudamqp = {
      url: env.CLOUDAMQP_URL
    };
  }

  if (env.RABBITMQ_URL || env.AMQP_URL || env.RABBITMQ_SERVICE
    || env.AMQP_SERVICE || cfg.rabbitmqBigwig || cfg.cloudamqp) {

    var service = (env.RABBITMQ_SERVICE || env.AMQP_SERVICE)
      && cfg[env.RABBITMQ_SERVICE || env.AMQP_SERVICE]
      || cfg.rabbitmqBigwig || cfg.cloudamqp;

    cfg.rabbitmq = {
      url: env.RABBITMQ_URL || env.AMQP_URL
        || env.RABBITMQ_TX_URL || env.AMQP_TX_URL
        || env.RABBITMQ_RX_URL || env.AMQP_RX_URL
        || service && (service.url
          || service.tx && service.tx.url
          || service.rx && service.rx.url),
      service: env.RABBITMQ_SERVICE || env.AMQP_SERVICE
        || (cfg.rabbitmqBigwig && 'rabbitmqBigwig')
        || (cfg.cloudamqp && 'cloudamqp'),
      tx: {
        url: env.RABBITMQ_TX_URL || env.AMQP_TX_URL
          || service && service.tx && service.tx.url
          || env.RABBITMQ_URL || env.AMQP_URL
          || service && service.url
          || env.RABBITMQ_RX_URL || env.AMQP_RX_URL
          || service && service.rx && service.rx.url},
      rx: {
        url: env.RABBITMQ_RX_URL || env.AMQP_RX_URL
          || service && service.rx && service.rx.url
          || env.RABBITMQ_URL || env.AMQP_URL
          || service && service.url
          || env.RABBITMQ_TX_URL || env.AMQP_TX_URL
          || service && service.tx && service.tx.url}
    };
    cfg.amqp = cfg.rabbitmq;
  }
};
