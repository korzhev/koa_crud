const mongoose = require('mongoose');

/**
 * handle error
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // cast and validation errors are "normal" errors
    if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
      err.status = 400;
    }
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    if (ctx.status >= 500) {
      console.error(err);
    }
  }
};
