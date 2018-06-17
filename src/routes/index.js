const pois = require('./pois');

module.exports = router => {
  router.prefix('/v1');
  router.use('/pois', pois);
};
