/**
 * Fix request body
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
module.exports = async (ctx, next) => {
  const { body } = ctx.request;
  if (body) {
    delete ctx.request.body.deleted;
    if (body.location && !body.location.type) {
      ctx.request.body.location.type = 'Point';
    }
  }

  await next();
};
