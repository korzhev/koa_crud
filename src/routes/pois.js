const Router = require('koa-router');

const bodyMW = require('../middlewares/body_builder');
const queryMW = require('../middlewares/query_builder');
const pois = require('../controllers/pois');

const router = new Router();

router
  .use(queryMW)
  .use(bodyMW)
  .get('/', pois.search)
  .post('/', pois.post)
  .put('/:id', pois.put)
  .patch('/:id', pois.patch)
  .delete('/:id', pois.delete)
  .get('/:id', pois.get);

module.exports = router.routes();
