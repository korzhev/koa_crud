/**
 * parse query strimg params as mongo query params
 * @param ctx
 * @param next
 * @returns {Promise<*>}
 */
module.exports = async (ctx, next) => {
  const { filter, select, limit, skip, sort } = ctx.query;
  try {
    if (filter) {
      ctx.query.filter = JSON.parse(filter);
      ctx.query.filter.deleted = false;
    }
    if (select) {
      ctx.query.select = JSON.parse(select);
    }
    if (sort) {
      ctx.query.sort = JSON.parse(sort);
    }
    if (limit) {
      ctx.query.limit = parseInt(limit, 10);
      if (Number.isNaN(ctx.query.limit)) throw new Error(`${skip} not a number`);
    }
    if (skip) {
      ctx.query.skip = parseInt(skip, 10);
      if (Number.isNaN(ctx.query.skip)) throw new Error(`${skip} not a number`);
    }
  } catch (e) {
    return ctx.throw(400, 'Bad qurystring params', { message: 'Bad querystring params' });
  }
  await next();
};
