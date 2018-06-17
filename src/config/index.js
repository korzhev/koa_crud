exports.isProd = process.env.NODE_ENV === 'production';

exports.mongo = {
  uri: process.env.MONGO || 'mongodb://localhost/geo',
  options: {
    keepAlive: 120,
    poolSize: 5,
  },
};

exports.port = process.env.PORT || 3000;

exports.maxJSONBody = process.env.MAX_JSON_BODY || '5mb';
