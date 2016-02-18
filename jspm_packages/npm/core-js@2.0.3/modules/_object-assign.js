/* */ 
'use strict';
var $ = require('./_'),
    toObject = require('./_to-object'),
    IObject = require('./_iobject');
module.exports = require('./_fails')(function() {
  var a = Object.assign,
      A = {},
      B = {},
      S = Symbol(),
      K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k) {
    B[k] = k;
  });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source) {
  var T = toObject(target),
      aLen = arguments.length,
      index = 1,
      getKeys = $.getKeys,
      getSymbols = $.getSymbols,
      isEnum = $.isEnum;
  while (aLen > index) {
    var S = IObject(arguments[index++]),
        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
        length = keys.length,
        j = 0,
        key;
    while (length > j)
      if (isEnum.call(S, key = keys[j++]))
        T[key] = S[key];
  }
  return T;
} : Object.assign;
