/* */ 
var setDesc = require('./_').setDesc,
    createDesc = require('./_property-desc'),
    has = require('./_has'),
    FProto = Function.prototype,
    nameRE = /^\s*function ([^ (]*)/,
    NAME = 'name';
NAME in FProto || require('./_descriptors') && setDesc(FProto, NAME, {
  configurable: true,
  get: function() {
    var match = ('' + this).match(nameRE),
        name = match ? match[1] : '';
    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
    return name;
  }
});
