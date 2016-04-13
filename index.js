'use strict';

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

var NAN = 0 / 0;

module.exports = function (value) {

  if (isNil(value)) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {

    var raw = isFunction(value.valueOf) ? value.valueOf() : value;

    value = isObject(raw) ? (raw + '') : raw;
  }

  var type = typeof value;

  if (type !== 'string') {
    return type === 'number' ? value : +value;
  }

  // trim
  value = value.replace(/^\s+|\s+$/g, '');

  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal  = /^0o[0-7]+$/i;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;


  var isBinary = reIsBinary.test(value);

  return (isBinary || reIsOctal.test(value))
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
};
