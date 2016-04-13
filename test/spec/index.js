'use strict';

var expect = require('chai').expect;


describe('to-number', function () {

  var toNumber = require('../../');

  it('common test', function () {
    expect(toNumber(1)).to.be.equal(1);
    expect(toNumber(Number.MAX_VALUE)).to.be.equal(Number.MAX_VALUE);
    expect(toNumber(Number.MIN_VALUE)).to.be.equal(Number.MIN_VALUE);
    expect(toNumber(Infinity)).to.be.equal(Infinity);
    expect(toNumber()).to.be.equal(0);
    expect(toNumber(null)).to.be.equal(0);
  });

  it('convert boolean to 0/1', function () {
    expect(toNumber(true)).to.be.equal(1);
    expect(toNumber(false)).to.be.equal(0);
  });

  it('convert string', function () {
    expect(toNumber('1')).to.be.equal(1);
    expect(toNumber('0')).to.be.equal(0);
    expect(toNumber('-1')).to.be.equal(-1);
    expect(toNumber('1.1000')).to.be.equal(1.1);
    expect(toNumber('-1.100')).to.be.equal(-1.1);
    expect(toNumber('01')).to.be.equal(1);
    expect(toNumber('0.10')).to.be.equal(.1);
    expect(toNumber('1a')).to.be.NaN
    expect(toNumber('a1')).to.be.NaN
  });


  it('convert binary', function () {
    expect(toNumber('0b01')).to.be.equal(1);
    expect(toNumber('0b10')).to.be.equal(2);
    expect(toNumber('0b11')).to.be.equal(3);
    expect(toNumber('0b02')).to.be.NaN
  });

  it('convert octal', function () {
    expect(toNumber('0o01')).to.be.equal(1);
    expect(toNumber('0o07')).to.be.equal(7);
    expect(toNumber('0o10')).to.be.equal(8);
    expect(toNumber('0o08')).to.be.NaN;

  });

  it('convert hex', function () {
    expect(toNumber('0x01')).to.be.equal(1);
    expect(toNumber('0x0F')).to.be.equal(15);
    expect(toNumber('0x0G')).to.be.NaN;
    expect(toNumber('-0x0F')).to.be.NaN;
    expect(toNumber('+0x0F')).to.be.NaN;
  });

  it('convert object', function () {

    var obj = { foo: 1 };

    expect(toNumber(obj)).to.be.NaN

    obj.valueOf = null;
    expect(toNumber(obj)).to.be.NaN

    obj.valueOf = function () {
      return 1;
    };
    expect(toNumber(obj)).to.be.equal(1);

    obj.valueOf = function () {
      return 0;
    };
    expect(toNumber(obj)).to.be.equal(0);

    expect(toNumber(function () {})).to.be.NaN
    expect(toNumber(new Object(1))).to.be.equal(1);
    expect(toNumber(new Number(1))).to.be.equal(1);
    expect(toNumber(new Number(1.1))).to.be.equal(1.1);
  });

});
