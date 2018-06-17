const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const mongoose = require('mongoose');

const config = require('./config');
const routes = require('./routes');
const errorMW = require('./middlewares/error');

const app = new Koa();
const router = new Router();

mongoose.Promise = Promise;
mongoose.connect(
  config.mongo.uri,
  config.mongo.options,
);

routes(router);

app.use(errorMW);
app.use(helmet());
if (!config.isProd) {
  app.use(logger());
}
app
  .use(cors())
  .use(
    bodyParser({
      enableTypes: ['json'],
      jsonLimit: config.maxJSONBody,
      strict: true,
      onerror: (err, ctx) => {
        ctx.throw(422, 'body parse error', { message: 'body parse error' });
      },
    }),
  )
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(config.port, () => console.info(`App is running on ${config.port}`));

exports.app = app;
exports.server = server;
