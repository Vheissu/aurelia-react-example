/* */ 
var $ = require('./_'),
    $export = require('./_export'),
    anObject = require('./_an-object');
$export($export.S, 'Reflect', {getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return $.getDesc(anObject(target), propertyKey);
  }});
