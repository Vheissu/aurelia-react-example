/* */ 
var $export = require('./_export'),
    getProto = require('./_').getProto,
    anObject = require('./_an-object');
$export($export.S, 'Reflect', {getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }});
