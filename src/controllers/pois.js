const { stringifyStreamResponse } = require('../libs/helpers');

const POI = require('../models/poi');

exports.get = async ctx => {
  const { select } = ctx.query;
  const { id } = ctx.params;
  const p = await POI.findOne({ _id: id, deleted: false }, select);
  if (!p) return ctx.throw(404);
  ctx.body = p;
};

exports.post = async ctx => {
  const data = ctx.request.body;
  const p = new POI(data);
  await p.save();
  ctx.status = 201;
  const result = p.toJSON();
  delete result.deleted;
  ctx.body = result;
};

exports.put = async ctx => {
  const { id } = ctx.params;
  const data = ctx.request.body;
  const p = await POI.findOneAndUpdate({ _id: id, deleted: false }, data, {
    new: true,
    runValidators: true,
  });
  if (!p) return ctx.throw(404);
  ctx.body = p;
};

exports.patch = async ctx => {
  const { id } = ctx.params;
  const data = ctx.request.body;
  const p = await POI.findOneAndUpdate(
    { _id: id, deleted: false },
    { $set: data },
    { new: true, runValidators: true },
  );
  if (!p) return ctx.throw(404);
  ctx.body = p;
};

exports.delete = async ctx => {
  const { id } = ctx.params;
  const p = await POI.findOneAndUpdate({ _id: id, deleted: false }, { $set: { deleted: true } });
  if (!p) return ctx.throw(404);
  ctx.body = p;
};

exports.search = async (ctx, next) => {
  const { filter, select, limit, skip, sort } = ctx.query;
  ctx.set('Content-Type', 'application/json');
  ctx.status = 200;
  const stream = POI.find(filter, select, { limit, skip, sort }).cursor({
    transform: stringifyStreamResponse(),
  });
  ctx.res.write('[');

  ctx.body = stream
    .once('error', next)
    .once('end', () => ctx.res.end(']'))
    .pipe(
      ctx.res,
      { end: false },
    );
};
