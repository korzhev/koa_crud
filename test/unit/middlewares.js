/* eslint-env node, mocha */
const chai = require('chai');
const sinon = require('sinon');

const bdMW = require('../../src/middlewares/body_builder');
const qbMW = require('../../src/middlewares/query_builder');

chai.should();

describe('middlewares/body_builder.js', () => {
  describe('body_builder middleware', () => {
    it('should delete "deleted" property', async () => {
      const ctx = {
        request: {
          body: {
            name: 'bike',
            deleted: true,
          },
        },
      };
      await bdMW(ctx, () => {});
      ctx.request.body.should.not.have.property('deleted');
    });

    it('should set "Point" type for location', async () => {
      const ctx = {
        request: {
          body: {
            name: 'bike',
            location: {
              coordinates: [10, 10],
            },
          },
        },
      };
      await bdMW(ctx, () => {});
      ctx.request.body.location.should.have.property('type').and.be.equal('Point');
    });
    it('should not set "Point" type for location, if location is not in body', async () => {
      const ctx = {
        request: {
          body: {
            name: 'bike',
          },
        },
      };
      await bdMW(ctx, () => {});
      ctx.request.body.should.not.have.property('location');
    });
  });
});

describe('middlewares/query_builder.js', () => {
  describe('query_builder middleware', () => {
    it('should parse "filter" param', async () => {
      const ctx = {
        query: {
          filter: '{ "_id": { "$in": [123, 456] } }',
        },
      };
      await qbMW(ctx, () => {});
      ctx.query.filter.should.be.deep.equal({ _id: { $in: [123, 456] }, deleted: false });
    });
    it('should parse "select" param', async () => {
      const ctx = {
        query: {
          select: '{ "name": -1 }',
        },
      };
      await qbMW(ctx, () => {});
      ctx.query.select.should.be.deep.equal({ name: -1 });
    });
    it('should parse "limit" param', async () => {
      const ctx = {
        query: {
          limit: '10',
        },
      };
      await qbMW(ctx, () => {});
      ctx.query.limit.should.be.equal(10);
    });
    it('should parse "skip" param', async () => {
      const ctx = {
        query: {
          skip: '11',
        },
      };
      await qbMW(ctx, () => {});
      ctx.query.skip.should.be.equal(11);
    });

    it('should throw ctx error with wrong skip', async () => {
      const cb = sinon.fake();
      const ctx = {
        query: {
          skip: 'qwe',
        },
        throw: cb,
      };
      await qbMW(ctx, () => {});
      const result = cb.calledWith(400, 'Bad qurystring params', {
        message: 'Bad querystring params',
      });
      cb.calledOnce.should.be.true; // eslint-disable-line
      result.should.be.true; // eslint-disable-line
    });
    it('should throw ctx error with invalid params', async () => {
      const cb = sinon.fake();
      const ctx = {
        query: {
          filter: 'qwe',
        },
        throw: cb,
      };
      await qbMW(ctx, () => {});
      const result = cb.calledWith(400, 'Bad qurystring params', {
        message: 'Bad querystring params',
      });
      cb.calledOnce.should.be.true; // eslint-disable-line
      result.should.be.true; // eslint-disable-line
    });
  });
});
