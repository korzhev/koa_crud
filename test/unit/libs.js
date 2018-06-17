/* eslint-env node, mocha */
const chai = require('chai');

chai.should();
const { stringifyStreamResponse } = require('../../src/libs/helpers');
const { isLocationValid } = require('../../src/libs/valiodators');

describe('libs/helpers.js', () => {
  describe('stringifyStreamResponse()', () => {
    it('should create function which transform mongo object to part of JSON string', () => {
      const list = [{ lupa: 30 }, { pupa: 40 }];
      const f = stringifyStreamResponse();
      const result = list.map(f);
      result.should.be.deep.equal(['{"lupa":30}', ',{"pupa":40}']);
    });
  });
});

describe('libs/validators.js', () => {
  describe('isLocationValid()', () => {
    it('should validate object coordinates(TRUE)', () => {
      const result = isLocationValid([100, -11.00123]);
      result.should.be.true; // eslint-disable-line
    });
    it('should validate object coordinates(FALSE): too big numbers', () => {
      const result = isLocationValid([1000, 11.00123]);
      result.should.be.false; // eslint-disable-line
    });
    it('should validate object coordinates(FALSE): too low numbers', () => {
      const result = isLocationValid([1000, -101.00123]);
      result.should.be.false; // eslint-disable-line
    });
    it('should validate object coordinates(FALSE): not a number', () => {
      const result = isLocationValid(['1000', 11.00123]);
      result.should.be.false; // eslint-disable-line
    });
    it('should validate object coordinates(FALSE): no latitude', () => {
      const result = isLocationValid([1000]);
      result.should.be.false; // eslint-disable-line
    });
    it('should validate object coordinates(FALSE): no an array', () => {
      const result = isLocationValid(1000);
      result.should.be.false; // eslint-disable-line
    });
  });
});
